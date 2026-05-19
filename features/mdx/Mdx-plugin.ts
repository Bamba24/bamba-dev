import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { type PluggableList } from "unified"; // Type officiel de Unified/Rehype

const options: Options = {
  theme: "one-dark-pro",
  keepBackground: true,
};

// On définit explicitement le type pour aider TypeScript
export const mdxRehypePlugins: PluggableList = [
  [rehypePrettyCode, options],
];