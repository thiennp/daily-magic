"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { SEND_TASK_DEVICE_ID_QUERY_PARAM } from "@/features/agent/constants/sendTaskModalQuery.constant";
import SendReadinessWriterNotice from "@/features/agent/send-readiness/SendReadinessWriterNotice";
import { resolveDeepLinkDeviceSwitchNotice } from "@/features/agent/utils/resolveDeepLinkDeviceSwitchNotice";

/** 77e29f7a: the link's computer is kept from first load, before any URL rewrite. */
export default function ComposerDeviceSwitchNotice(props: {
  readonly runDeviceId: string;
  /** The computer the user picked themself; no banner while it runs there. */
  readonly userPickedDeviceId?: string;
  readonly isDevicesLoading: boolean;
  readonly displayNameById: ReadonlyMap<string, string>;
}) {
  const searchParams = useSearchParams();
  const [linkDeviceId] = useState(
    () => searchParams.get(SEND_TASK_DEVICE_ID_QUERY_PARAM)?.trim() ?? "",
  );
  const pickedByUser =
    (props.userPickedDeviceId ?? "").length > 0 &&
    props.userPickedDeviceId === props.runDeviceId;
  const notice =
    props.isDevicesLoading || pickedByUser
      ? null
      : resolveDeepLinkDeviceSwitchNotice({
          linkDeviceId,
          runDeviceId: props.runDeviceId,
          displayNameById: props.displayNameById,
        });
  return notice === null ? null : (
    <div className="mb-3">
      <SendReadinessWriterNotice notice={notice} />
    </div>
  );
}
