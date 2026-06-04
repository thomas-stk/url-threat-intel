import { useState } from 'react';
import axios from 'axios';
import type { AnalyseResponse } from './types/intel';
import { analyseTarget } from './services/api';
import { SearchBar } from './components/SearchBar';
import { LoadingState } from './components/LoadingState';
import { ErrorBanner } from './components/ErrorBanner';
import { IpResults } from './components/IpResults';
import { UrlResults } from './components/UrlResults';

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyseResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasResults = result !== null || loading || error !== null;

  async function handleSubmit(target: string) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyseTarget(target);
      setResult(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;
        setError(detail ?? `Request failed: ${err.message}`);
      } else {
        setError('An unexpected error occurred. Check the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleHome() {
    setQuery('');
    setResult(null);
    setError(null);
    setLoading(false);
  }

  return (
    <div className="min-h-svh flex flex-col">
      <header className="sticky top-0 z-10 border-b border-border-subtle bg-bg px-6">
        <div className="max-w-[1100px] mx-auto h-[52px] flex items-center">
          <button
            onClick={handleHome}
            className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.04em] uppercase text-ink-muted hover:text-ink transition-colors cursor-pointer bg-transparent border-none p-0"
            aria-label="Go to home"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-shrink-0">
              <circle cx="9" cy="9" r="8" stroke="var(--color-primary)" strokeWidth="1.5" />
              <circle cx="9" cy="9" r="4" fill="var(--color-primary)" opacity="0.25" />
              <circle cx="9" cy="9" r="1.5" fill="var(--color-primary)" />
            </svg>
            Threat Intel
          </button>
        </div>
      </header>

      <main className={`flex-1 flex flex-col items-center px-6 pb-20 gap-8 ${hasResults ? 'pt-12' : 'justify-center'}`}>
        {!hasResults && (
          <div className="text-center">
            <h1 className="text-[30px] font-semibold tracking-[-0.02em] text-ink text-balance mb-2">
              Threat Intelligence
            </h1>
            <p className="text-[13px] text-ink-muted max-w-[42ch] mx-auto leading-relaxed">
              Analyse IP addresses and URLs against AbuseIPDB and VirusTotal
            </p>
          </div>
        )}

        <div className="w-full max-w-[640px]">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>

        {loading && <LoadingState />}

        {error && (
          <ErrorBanner message={error} onDismiss={() => setError(null)} />
        )}

        {result?.type === 'ip' && <IpResults data={result} />}
        {result?.type === 'url' && <UrlResults data={result} />}
      </main>
    </div>
  );
}
