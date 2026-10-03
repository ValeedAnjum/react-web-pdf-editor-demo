export function CodeBlock({
  title,
  code,
  language = "tsx",
}: {
  title: string;
  code: string;
  language?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
      <figcaption className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-2.5 text-xs text-zinc-400">
        <span className="truncate font-medium text-zinc-200">{title}</span>
        <span className="shrink-0 font-mono uppercase tracking-wide">
          {language}
        </span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-zinc-100">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
