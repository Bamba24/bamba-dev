// recuperer tous les fichiers mdx dans le dossier content
import {cache} from "react";
import path from "node:path";
import fs from "fs/promises";
import {z} from "zod"
import matter from "gray-matter";

export const revalidate = 3600; // Revalide les articles toutes les heures (3600 secondes)

  const postSchemas = z.object({
  title: z.string(),
  description: z.string(),
  tag: z.string(),
  publishedAt: z.coerce.string(),
  published: z.boolean().optional().default(false)
})

type Post = z.infer<typeof postSchemas> & {
  slug: string;
  content: string;
}


// Recuperer et filtrer les fichiers mdx
export const getPosts = cache( async (locale: string) => {

  const postsDirectory = path.join(process.cwd(),  "content", locale);
  const files = await fs.readdir(postsDirectory);
  const filenames = files.filter((file: string) => file.endsWith(".mdx"));

  const posts: Post[] = [];
  for await (const filename of filenames) {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const frontMatter = matter(fileContent)

    const safeParse = postSchemas.safeParse(frontMatter.data);
    if (!safeParse.success) {
      console.error(`Error parsing front matter for ${filename}:`, safeParse.error);
      continue;
    }

    if (!safeParse.data.published && process.env.NODE_ENV !== "development") {
      continue;
    }



    posts.push({
      ...safeParse.data,
      slug: filename.replace(/^\d+-/, "").replace(".mdx", ""),
      content: frontMatter.content
    });

  }
  return posts.sort((a, b)=> new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
});

export const getPostBySlug = cache(async (slug: string, locale: string)=>{
  const posts = await getPosts(locale)
  return posts.find((post) => post.slug === slug);
});

export const getPostByTag = cache(async (tag: string, locale: string) => {
  const posts = await getPosts(locale)
  return posts.filter((post) => post.tag === tag)
}
);
