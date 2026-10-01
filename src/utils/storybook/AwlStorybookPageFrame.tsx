"use client";

export default function AwlStorybookPageFrame({
  html,
}: {
  readonly html: string;
}) {
  return (
    <iframe
      title="Agent Witch Live page preview"
      srcDoc={html}
      className="min-h-screen w-full border-0 bg-white"
      style={{ minHeight: "100vh" }}
    />
  );
}
