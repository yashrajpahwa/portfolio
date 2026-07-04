import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function ogImage({ title, subtitle }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0c0c0c",
          color: "#e8e6e1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#5a9e8f", fontSize: 28 }}>
          yashraj.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 40 ? 56 : 68,
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: "flex", fontSize: 28, color: "#8a8a8a" }}>
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    ),
    OG_SIZE
  );
}
