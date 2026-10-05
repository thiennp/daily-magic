import { AWC_THEME_STORAGE_KEY } from "@/lib/theme/themeStorage.constant";

/**
 * Blocking script: apply stored .dark before first paint (matches ThemeContext).
 */
export const AWC_THEME_INIT_INLINE_SCRIPT = `(function(){try{if(localStorage.getItem(${JSON.stringify(
  AWC_THEME_STORAGE_KEY,
)})==="dark")document.documentElement.classList.add("dark");}catch(e){}})();`;
