import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";

interface FeedbackSubmittedNoticeProps {
  readonly feedback: CapabilityFeedbackRecord;
}

export default function FeedbackSubmittedNotice({
  feedback,
}: FeedbackSubmittedNoticeProps) {
  return (
    <section className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
      <h2 className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
        Thanks for your feedback
      </h2>
      <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-300">
        {feedback.comment}
      </p>
    </section>
  );
}
