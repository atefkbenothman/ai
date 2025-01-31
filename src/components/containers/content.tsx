export default function Content({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex-1 h-[calc(100vh-3rem)] px-4 pb-4 overscroll-y-none">
      {children}
    </div>
  )
}