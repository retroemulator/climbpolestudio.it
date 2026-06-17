import { ImageResponse } from "next/og";

export const alt = "Climb Pole Studio — Arti aeree e movimento a Torino";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG image di default (brief §10): wordmark con eco magenta su fondo ink. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0D0D0F",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, letterSpacing: 8, color: "#F087DD" }}>
          TORINO · ARTI AEREE E MOVIMENTO
        </div>
        <div style={{ position: "relative", display: "flex", marginTop: 12 }}>
          <div style={{ position: "absolute", left: 10, top: 10, fontSize: 240, fontWeight: 800, color: "#F087DD" }}>
            CLIMB
          </div>
          <div style={{ fontSize: 240, fontWeight: 800, color: "#FAF3F4" }}>CLIMB</div>
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 36, color: "rgba(250,243,244,0.7)" }}>
          climbpolestudio.it
        </div>
      </div>
    ),
    { ...size },
  );
}
