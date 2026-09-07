import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { type PluggableList } from "unified"; // Type officiel de Unified/Rehype

const options: Options = {
  theme: "one-dark-pro",
  keepBackground: true,
};

export const mdxRemarkPlugins: PluggableList = [
  remarkGfm,
];

// On définit explicitement le type pour aider TypeScript
export const mdxRehypePlugins: PluggableList = [
  [rehypePrettyCode, options],
];