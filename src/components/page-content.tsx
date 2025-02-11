export function PageContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-[calc(100svh-3rem)] w-full max-w-full flex-1 overflow-x-auto overscroll-y-none px-4 pb-4">
      <div className="no-scrollbar flex h-full w-full max-w-full flex-col overflow-x-auto rounded-sm border-[0.1rem]">
        {children}
      </div>
    </div>
  )
}
