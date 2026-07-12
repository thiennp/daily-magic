"use client";

import { useState } from "react";

import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";

interface AgentRunFeedbackFormProps {
  readonly runId: string;
  readonly onSubmitted: (feedback: CapabilityFeedbackRecord) => void;
}

export default function AgentRunFeedbackForm({
  runId,
  onSubmitted,
}: AgentRunFeedbackFormProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitFeedback = (): void => {
    setIsSubmitting(true);
    setErrorMessage("");
    void fetch(`/api/agent-runs/${runId}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment: comment.trim() }),
    })
      .then(async (response) => {
        const data: unknown = await response.json();
        if (!response.ok) {
          const message =
            typeof data === "object" &&
            data !== null &&
            "error" in data &&
            typeof (data as { error: unknown }).error === "string"
              ? (data as { error: string }).error
              : "Could not send feedback.";
          setErrorMessage(message);
          return;
        }

        if (typeof data === "object" && data !== null && "feedback" in data) {
          onSubmitted(
            (data as { feedback: CapabilityFeedbackRecord }).feedback,
          );
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="mt-6 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
      <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
        How did this job go?
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Your note goes to the assistant owner. It does not change their setup
        automatically.
      </p>
      <label className="mt-4 block text-sm text-gray-700 dark:text-gray-300">
        Rating (optional)
        <select
          value={rating ?? ""}
          onChange={(event) => {
            const value = event.target.value;
            setRating(value.length > 0 ? Number(value) : null);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">No rating</option>
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} star{value === 1 ? "" : "s"}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block text-sm text-gray-700 dark:text-gray-300">
        Comment
        <textarea
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          rows={4}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          placeholder="What worked well or should improve next time?"
        />
      </label>
      {errorMessage.length > 0 ? (
        <p className="mt-2 text-sm text-rose-600">{errorMessage}</p>
      ) : null}
      <button
        type="button"
        disabled={isSubmitting || comment.trim().length === 0}
        onClick={submitFeedback}
        className="mt-4 inline-flex h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white disabled:opacity-50"
      >
        Send feedback
      </button>
    </section>
  );
}
