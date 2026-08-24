import { cache } from "react";
import path from "node:path";
import fs from "fs/promises";
import { z } from "zod";
import matter from "gray-matter";

export const revalidate = 3600;

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  tag: z.string(),
  publishedAt: z.coerce.string(),
  published: z.boolean().optional().default(false),
  time: z.number(),
});

export type PostPreview = z.infer<typeof postSchema> & {
  slug: string;
};

export type Post = PostPreview & {
  content: string;
};

const getContentDirectory = (locale: string) =>
  path.join(process.cwd(), "content", locale);

const createSlug = (filename: string) =>
  filename.replace(/^\d+-/, "").replace(".mdx", "");

async function parsePostFile(
  filePath: string,
  slug: string
): Promise<Post | null> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");

    const { data, content } = matter(fileContent);

    const parsed = postSchema.safeParse(data);

    if (!parsed.success) {
      console.error(
        `Erreur de validation pour ${filePath}:`,
        parsed.error
      );
      return null;
    }

    if (
      !parsed.data.published &&
      process.env.NODE_ENV !== "development"
    ) {
      return null;
    }

    return {
      ...parsed.data,
      slug,
      content,
    };
  } catch (error) {
    console.error(`Erreur lecture fichier ${filePath}:`, error);
    return null;
  }
}

export const getPostsPreview = cache(async (
  locale: string
): Promise<PostPreview[]> => {
  const contentDirectory = getContentDirectory(locale);

  const files = await fs.readdir(contentDirectory);

  const mdxFiles = files.filter((file) =>
    file.endsWith(".mdx")
  );

  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = createSlug(filename);

      const filePath = path.join(
        contentDirectory,
        filename
      );

      const post = await parsePostFile(filePath, slug);

      if (!post) {
        return null;
      }

      const preview: PostPreview = {
        title: post.title,
        description: post.description,
        tag: post.tag,
        publishedAt: post.publishedAt,
        published: post.published,
        time: post.time,
        slug: post.slug,
      };

      return preview;
    })
  );

  return posts
    .filter(
      (post): post is PostPreview =>
        post !== null
    )
    .sort(
      (a, b) =>
        Date.parse(b.publishedAt) -
        Date.parse(a.publishedAt)
    );
});

export const getPostBySlug = cache(async (
  slug: string,
  locale: string
): Promise<Post | null> => {
  const contentDirectory = getContentDirectory(locale);

  const files = await fs.readdir(contentDirectory);

  const filename = files.find(
    (file) =>
      file.endsWith(".mdx") &&
      createSlug(file) === slug
  );

  if (!filename) {
    return null;
  }

  const filePath = path.join(
    contentDirectory,
    filename
  );

  return parsePostFile(filePath, slug);
});

export const getPostByTag = cache(async (
  tag: string,
  locale: string
): Promise<PostPreview[]> => {
  const posts = await getPostsPreview(locale);

  return posts.filter(
    (post) => post.tag === tag
  );
});