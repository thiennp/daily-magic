export type UpdateProjectKnowledgeWakeResponse =
  | { readonly ok: true; readonly id: string }
  | {
      readonly ok: false;
      readonly errorMessage: string;
      readonly httpStatus?: number;
    };
