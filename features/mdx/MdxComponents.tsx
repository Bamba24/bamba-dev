import React from 'react';
import MdxYoutube from './MdxYoutube';
import MdxNote from './MdxNote';

export const component = {
  Youtube: MdxYoutube,
  Note: MdxNote,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border/60 bg-card/30 shadow-xs">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-border/60 bg-muted/40 font-mono text-xs uppercase tracking-wider text-foreground" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border/30 [&_tr:last-child]:border-0" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="transition-colors hover:bg-muted/30" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 font-medium text-foreground text-left whitespace-nowrap" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-muted-foreground align-top text-xs sm:text-sm leading-relaxed" {...props} />
  ),
};