import { SEND_TASK_MODAL_QUERY_PARAM } from "@/features/agent/constants/sendTaskModalQuery.constant";

export const stripSendTaskModalQuery = (searchParams: {
  readonly toString: () => string;
}): string => {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(SEND_TASK_MODAL_QUERY_PARAM);
  const query = params.toString();
  return query.length > 0 ? `?${query}` : "";
};
