 
import MdxYoutube from './MdxYoutube';
import MdxNote from "./MdxNote"
// import { HtmlHTMLAttributes } from 'react';
 
 export const component = {
  Youtube: MdxYoutube,
  Note: MdxNote,
  // h1: (props: HtmlHTMLAttributes<HTMLHeadingElement>) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  // h2: (props: HtmlHTMLAttributes<HTMLHeadingElement>) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
  // h3: (props: HtmlHTMLAttributes<HTMLHeadingElement>) => <h3 className="text-2xl font-bold mt-4 mb-2" {...props} />,
  // p: (props: HtmlHTMLAttributes<HTMLParagraphElement>) => <p className="text-base leading-7 my-4" {...props} />,
  // ul: (props: HtmlHTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside my-4 space-y-2" {...props} />,
  // ol: (props: HtmlHTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside my-4 space-y-2" {...props} />,
  // a: (props: HtmlHTMLAttributes<HTMLAnchorElement>) => <a className="text-amber-600 hover:underline" {...props} />,
  // // Style uniquement le code en ligne (inline code)
  // code: (props: HtmlHTMLAttributes<HTMLElement>) => <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm" {...props} />,
  // // Style le bloc de code et retire le fond gris du code parent
  // pre: (props: HtmlHTMLAttributes<HTMLPreElement>) => (
  //   <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4  text-sm [&>code]:bg-transparent [&>code]:p-0" {...props} />
  // ),
  // blockquote: (props: HtmlHTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-4 border-amber-600 pl-4 italic my-4 text-gray-600" {...props} />,
 }