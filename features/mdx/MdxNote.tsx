import {Alert} from "@/components/ui/alert";

type props = {
  children: React.ReactNode
}

export default function MdxNote(props: props) {
  return (
    <Alert className="border-0 border-l-2 border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
        <div className="grid gap-1 mdx-content">
         {props.children}
        </div>
    </Alert>
  );
}