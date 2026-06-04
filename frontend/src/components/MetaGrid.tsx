import type { ReactNode } from 'react';

export interface MetaItem {
  label: string;
  value: ReactNode;
  mono?: boolean;
}

interface Props {
  items: MetaItem[];
}

export function MetaGrid({ items }: Props) {
  return (
    <dl className="flex flex-col gap-3">
      {items.map(({ label, value, mono }) => (
        <div className="grid grid-cols-[110px_1fr] gap-4 items-baseline" key={label}>
          <dt className="text-[11px] text-ink-faint uppercase tracking-[0.05em] flex-shrink-0">{label}</dt>
          <dd className={`text-[13px] text-ink break-words ${mono ? 'font-mono' : ''}`}>
            {value ?? <span className="text-ink-faint">—</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
