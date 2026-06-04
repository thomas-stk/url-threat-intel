interface Props {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: Props) {
  return (
    <div
      className="w-full max-w-[640px] flex items-start gap-2.5 px-3.5 py-3 bg-risk-danger-bg border border-risk-danger-border rounded-md text-risk-danger"
      role="alert"
    >
      <svg className="flex-shrink-0 mt-px" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5v4M8 10.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="flex-1 text-[13px] leading-relaxed">{message}</span>
      <button
        className="flex-shrink-0 bg-transparent border-none text-inherit opacity-60 hover:opacity-100 p-0.5 flex items-center transition-opacity"
        onClick={onDismiss}
        aria-label="Dismiss error"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
