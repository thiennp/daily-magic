import { ImageResponse } from "next/og";

export const alt = "Agent Witch real examples";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #465fff 100%)",
        padding: "64px",
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#c7d7fe",
        }}
      >
        Real examples
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          See how teams use Agent Witch
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            lineHeight: 1.4,
            color: "#e2e8f0",
            maxWidth: 920,
          }}
        >
          Short stories for people who love AI but are not sure where to start
          with agents.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          fontWeight: 600,
          color: "#c7d7fe",
        }}
      >
        agentwitch.com/showcases
      </div>
    </div>,
    size,
  );
}
