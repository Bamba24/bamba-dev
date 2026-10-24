import { ImageResponse } from "next/og";
import { getPostsPreview, getPostBySlug } from "@/lib/posts";

export const alt = "bamba.dev Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["fr", "en"];
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    try {
      const posts = await getPostsPreview(locale);
      posts.forEach((post) => {
        params.push({ locale, slug: post.slug });
      });
    } catch (error) {
      console.error(
        `Erreur generateStaticParams (OG Image) pour la locale ${locale}:`,
        error
      );
    }
  }

  return params;
}

export default async function Image({ params }: Props) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale);

  const title = post?.title || slug.replace(/-/g, " ");
  const description = post?.description || "";
  const tag = post?.tag || "Tech";
  const isFr = locale === "fr";
  const readTime = post?.time
    ? `${post.time} min de lecture`
    : isFr
    ? "5 min de lecture"
    : "5 min read";

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
            "radial-gradient(circle at 88% 12%, rgba(245, 158, 11, 0.18) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(39, 39, 42, 0.5) 0%, transparent 45%)",
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
          {/* Logo Brand */}
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
                fontSize: "26px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#ffffff",
              }}
            >
              bamba.dev
            </span>
          </div>

          {/* Tag Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              color: "#fbbf24",
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            <span>#{tag}</span>
          </div>
        </div>

        {/* Central Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1020px",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 60 ? "46px" : "56px",
              fontWeight: 900,
              lineHeight: 1.2,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-1px",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {title}
          </h1>

          {description && (
            <p
              style={{
                fontSize: "22px",
                color: "#a1a1aa",
                lineHeight: 1.45,
                margin: 0,
                display: "-webkit-box",
                overflow: "hidden",
              }}
            >
              {description.length > 150
                ? `${description.slice(0, 150)}…`
                : description}
            </p>
          )}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272a",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              color: "#a1a1aa",
              fontSize: "17px",
            }}
          >
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              Bamba
            </span>
            <span>•</span>
            <span>{readTime}</span>
          </div>

          <div
            style={{
              fontSize: "17px",
              color: "#71717a",
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
