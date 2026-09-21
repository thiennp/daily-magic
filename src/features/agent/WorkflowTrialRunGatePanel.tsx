"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import AppPanel from "@/components/surfaces/AppPanel";
import { buildSignInHrefFromPathAndSearchParams } from "@/features/empty-states/buildGuestAuthHrefs";
import {
  WorkflowTrialRunBlockReason,
  type WorkflowTrialRunBlockReasonValue,
} from "@/lib/dispatch/resolveWorkflowTrialRunEligibility";

interface WorkflowTrialRunGatePanelProps {
  readonly reason: WorkflowTrialRunBlockReasonValue;
}

const copyForReason = (
  reason: WorkflowTrialRunBlockReasonValue,
): { readonly title: string; readonly body: string } => {
  if (reason === WorkflowTrialRunBlockReason.SIGN_IN_REQUIRED) {
    return {
      title: "Sign in to run this workflow",
      body: "You can browse and save playbooks without an account. To send a workflow or see live output, sign in and connect a Mac or Cursor Cloud API key.",
    };
  }

  return {
    title: "Connect a Mac or Cursor Cloud to run workflows",
    body: "Pair a Mac with Agent Witch or save a Cursor Cloud API key in your account settings. Workflow runs need somewhere to execute.",
  };
};

const HOME_DEVICES_SETUP_HASH = "#your-setup";

export default function WorkflowTrialRunGatePanel({
  reason,
}: WorkflowTrialRunGatePanelProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const copy = copyForReason(reason);
  const signInHref = buildSignInHrefFromPathAndSearchParams(
    pathname,
    new URLSearchParams(searchParams.toString()),
  );
  const connectDevicesHref = `/${HOME_DEVICES_SETUP_HASH}`;

  return (
    <AppPanel>
      <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        {copy.title}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {copy.body}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {reason === WorkflowTrialRunBlockReason.SIGN_IN_REQUIRED ? (
          <Link
            href={signInHref}
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400"
          >
            Sign in
          </Link>
        ) : (
          <>
            <Link
              href={connectDevicesHref}
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400"
            >
              Connect your Mac
            </Link>
            <Link
              href={connectDevicesHref}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-white/90 dark:hover:bg-white/5"
            >
              Add Cursor Cloud API key
            </Link>
          </>
        )}
        <Link
          href="/library"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-white/90 dark:hover:bg-white/5"
        >
          Back to Library
        </Link>
      </div>
    </AppPanel>
  );
}
