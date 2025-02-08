export function LoadingAnimation() {
  return (
    <div className="flex items-center space-x-1 rounded-3xl px-1 py-1">
      {[0, 1, 2].map((dot) => (
        <div
          key={dot}
          className={`h-1.5 w-1.5 animate-bounce rounded-full bg-white/30`}
          style={{ animationDelay: `${dot * 0.15}s` }}
        />
      ))}
    </div>
  )
}
