import type { UpdateUserProjectInput } from "@/lib/projects/parseUserProjectBody";

export type ParseUpdateUserProjectBodyResult =
  | { readonly kind: "ok"; readonly input: UpdateUserProjectInput }
  | { readonly kind: "folder_immutable" }
  | { readonly kind: "validation_error"; readonly errorMessage: string }
  | { readonly kind: "invalid" };
