import { Suspense } from "react";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { component } from "./MdxComponents";
import { mdxRehypePlugins, mdxRemarkPlugins } from "./Mdx-plugin";

export default async function Page({children}: {children: string}) {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MDXRemote
         source={children}
         components={component}
         options={{
          mdxOptions: {
            remarkPlugins: mdxRemarkPlugins,
            rehypePlugins: mdxRehypePlugins
          }
         }}
      />
    </Suspense>
  );
}