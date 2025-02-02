export default function Content({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-[calc(100vh-3rem)] flex-1 overscroll-y-none px-4 pb-4">
      {children}
    </div>
  )
}
