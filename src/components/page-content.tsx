export function PageContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-[calc(100svh-3rem)] max-w-full flex-1 overflow-x-auto overscroll-y-none px-4 pb-4">
      {children}
    </div>
  )
}
