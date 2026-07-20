import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export const selectComposerProject = (input: {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly project: UserProjectRecord;
  readonly replaceHref: (href: string) => void;
}): void => {
  input.composer.setSelectedProjectId(input.project.id);
  input.replaceHref(
    buildAgentComposerHref({
      libraryCapabilityId: input.composer.selectedLibraryCapabilityId,
      projectId: input.project.id,
      deviceId:
        input.composer.selectedDeviceId.length > 0
          ? input.composer.selectedDeviceId
          : undefined,
    }),
  );
  input.wizard.completeProjectStep();
};

export const clearComposerProjectSelection = (input: {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly replaceHref: (href: string) => void;
  readonly libraryCapabilityId?: string;
}): void => {
  input.composer.clearSelectedProject();
  input.replaceHref(
    buildAgentComposerHref({
      libraryCapabilityId: input.libraryCapabilityId,
    }),
  );
  input.wizard.resetProjectStep();
};
