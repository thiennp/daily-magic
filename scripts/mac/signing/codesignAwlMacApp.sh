#!/usr/bin/env bash
# Inside-out codesign of AgentWitchLocal.app (sourced, not run).
# Nested code (dylibs, frameworks, bundles, XPC services, helper apps/tools) is
# signed deepest-first, then the app bundle itself. Never uses --deep to sign.
#
# awl_codesign_app <app-dir> <identity> <entitlements> <runner>
#   identity "-"   => ad-hoc (hardened runtime, --timestamp=none)
#   runner         => awl_run (ad-hoc, always executes) | awl_release_run

awl_is_macho() {
  file -b "$1" 2>/dev/null | grep -q "Mach-O"
}

# Prints nested code paths deepest-first (one per line).
awl_list_nested_code() {
  local app="$1" main_exec="$2"
  {
    find "${app}/Contents" -mindepth 2 \( -name "*.dylib" -o -name "*.so" \
      -o -name "*.framework" -o -name "*.bundle" -o -name "*.xpc" \
      -o -name "*.appex" -o -name "*.app" \) -print
    find "${app}/Contents/MacOS" "${app}/Contents/Helpers" -type f -perm -u+x \
      ! -path "${main_exec}" -print 2>/dev/null | while IFS= read -r candidate; do
      awl_is_macho "${candidate}" && echo "${candidate}"
    done
  } | awk -F/ '{ print NF "\t" $0 }' | sort -rn -k1,1 | cut -f2- | uniq
}

awl_codesign_one() {
  local runner="$1" target="$2" identity="$3" entitlements="$4"
  local args=(--force --sign "${identity}" --options runtime)
  if [[ "${identity}" == "-" ]]; then
    args+=(--timestamp=none)
  else
    args+=(--timestamp)
  fi
  args+=(${AWL_CODESIGN_KEYCHAIN_ARGS[@]+"${AWL_CODESIGN_KEYCHAIN_ARGS[@]}"})
  # Entitlements only on executables (app / helper tools / XPC), never on libraries.
  if [[ -n "${entitlements}" ]]; then
    args+=(--entitlements "${entitlements}")
  fi
  "${runner}" codesign "${args[@]}" "${target}"
}

awl_codesign_app() {
  local app="$1" identity="$2" entitlements="$3" runner="$4"
  local exec_name main_exec nested count=0
  exec_name="$(/usr/libexec/PlistBuddy -c "Print :CFBundleExecutable" "${app}/Contents/Info.plist")"
  main_exec="${app}/Contents/MacOS/${exec_name}"
  [[ -f "${main_exec}" ]] || awl_fail "Main executable missing at ${main_exec}"
  while IFS= read -r nested; do
    [[ -z "${nested}" ]] && continue
    count=$((count + 1))
    case "${nested}" in
      *.dylib | *.so | *.framework | *.bundle) awl_codesign_one "${runner}" "${nested}" "${identity}" "" ;;
      *) awl_codesign_one "${runner}" "${nested}" "${identity}" "${entitlements}" ;;
    esac
  done < <(awl_list_nested_code "${app}" "${main_exec}")
  awl_log "Signed ${count} nested code item(s) inside-out; now signing the app bundle."
  awl_codesign_one "${runner}" "${app}" "${identity}" "${entitlements}"
}
