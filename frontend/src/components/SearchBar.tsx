import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  onSubmit: (target: string) => void;
  loading: boolean;
}

type InputType = 'ip' | 'url' | null;

const IP_RE = /^\d{1,3}(\.\d{1,3}){0,3}/;
const URL_RE = /^https?:\/\//i;

function detectType(value: string): InputType {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (URL_RE.test(trimmed)) return 'url';
  if (IP_RE.test(trimmed)) return 'ip';
  return null;
}

export function SearchBar({ query, onQueryChange, onSubmit, loading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const detectedType = detectType(query);

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    if (!query.trim() || loading) return;
    onSubmit(query.trim());
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    <form className="w-full" onSubmit={handleSubmit} role="search">
      <div
        className={`flex items-center bg-surface border rounded-[10px] transition-all duration-150 ${
          focused
            ? 'border-primary shadow-[0_0_0_3px_oklch(0.63_0.120_200_/_0.18)]'
            : 'border-border-subtle'
        }`}
      >
        {/* Left slot — search icon or detected-type badge */}
        <div className="flex-shrink-0 w-11 flex items-center justify-center">
          {detectedType ? (
            <span
              className={`text-[10px] font-mono font-semibold tracking-widest px-1.5 py-[3px] rounded-[3px] ${
                detectedType === 'ip'
                  ? 'bg-primary/15 text-primary'
                  : 'bg-accent/15 text-accent'
              }`}
              aria-label={`Detected as ${detectedType.toUpperCase()}`}
            >
              {detectedType.toUpperCase()}
            </span>
          ) : (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="text-ink-faint">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          )}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          className="flex-1 bg-transparent border-none outline-none text-ink text-[14px] py-[14px] min-w-0 font-mono placeholder:text-ink-faint placeholder:font-sans disabled:opacity-50"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="IP address or URL"
          aria-label="IP address or URL to analyse"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          disabled={loading}
        />

        {/* Right actions */}
        <div className="flex items-center gap-1 px-1.5">
          {query && !loading && (
            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center text-ink-faint hover:text-ink-muted rounded-[5px] transition-colors"
              onClick={() => { onQueryChange(''); inputRef.current?.focus(); }}
              aria-label="Clear"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          )}

          <button
            type="submit"
            className="h-9 px-5 bg-primary text-white border-none rounded-[6px] text-[13px] font-semibold tracking-[0.01em] transition-colors hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center min-w-[62px]"
            disabled={loading || !query.trim()}
            aria-label={loading ? 'Scanning…' : 'Scan'}
          >
            {loading ? (
              <span className="block w-3.5 h-3.5 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            ) : (
              'Scan'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
