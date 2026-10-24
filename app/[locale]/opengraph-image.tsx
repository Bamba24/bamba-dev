import { ImageResponse } from "next/og";

export const alt = "bamba.dev - Blog & Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const subtitle = isFr
    ? "Pensées sur le code, l'architecture logicielle et l'IA"
    : "Thoughts on code, software architecture, and AI";

  const pillText = isFr ? "Ingénierie & Produit" : "Engineering & Product";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(245, 158, 11, 0.15) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(39, 39, 42, 0.4) 0%, transparent 50%)",
          padding: "60px 70px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#fafafa",
          border: "8px solid #18181b",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Brand Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#f59e0b",
                borderRadius: "3px",
              }}
            />
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#ffffff",
              }}
            >
              bamba.dev
            </span>
          </div>

          {/* Category Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              color: "#fbbf24",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            <span>{pillText}</span>
          </div>
        </div>

        {/* Central Title & Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "960px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-1.5px",
            }}
          >
            Blog & Ingénierie Logicielle
          </h1>
          <p
            style={{
              fontSize: "26px",
              color: "#a1a1aa",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom Bar / Topics */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272a",
            paddingTop: "28px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              color: "#71717a",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            <span>TypeScript</span>
            <span>•</span>
            <span>Next.js</span>
            <span>•</span>
            <span>GraphQL</span>
            <span>•</span>
            <span>Architecture</span>
            <span>•</span>
            <span>DevOps</span>
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "#d4d4d8",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            bambadev.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
