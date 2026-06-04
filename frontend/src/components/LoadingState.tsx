export function LoadingState() {
  return (
    <div className="w-full max-w-[1100px]" aria-busy="true" aria-label="Analysing target">
      <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
        <div className="bg-surface border border-border-subtle rounded-[10px] p-5 flex flex-col gap-4">
          <div className="pb-4 border-b border-border-subtle">
            <div className="shimmer h-2.5 w-[40%] rounded-[4px]" />
          </div>
          <div className="shimmer w-[110px] h-[110px] rounded-full flex-shrink-0" />
          <div className="flex flex-col gap-2.5">
            <div className="shimmer h-2.5 w-full rounded-[4px]" />
            <div className="shimmer h-2.5 w-[70%] rounded-[4px]" />
            <div className="shimmer h-2.5 w-full rounded-[4px]" />
            <div className="shimmer h-2.5 w-[70%] rounded-[4px]" />
            <div className="shimmer h-2.5 w-[40%] rounded-[4px]" />
          </div>
        </div>
        <div className="bg-surface border border-border-subtle rounded-[10px] p-5 flex flex-col gap-4">
          <div className="pb-4 border-b border-border-subtle">
            <div className="shimmer h-2.5 w-[40%] rounded-[4px]" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="shimmer h-[68px] rounded-md" />
            <div className="shimmer h-[68px] rounded-md" />
            <div className="shimmer h-[68px] rounded-md" />
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="shimmer h-2.5 w-full rounded-[4px]" />
            <div className="shimmer h-2.5 w-[70%] rounded-[4px]" />
            <div className="shimmer h-2.5 w-full rounded-[4px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
