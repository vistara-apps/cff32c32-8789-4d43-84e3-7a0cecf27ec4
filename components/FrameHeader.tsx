import { cn } from '@/utils/cn'

interface FrameHeaderProps {
  title: string
  showBack?: boolean
  className?: string
}

export function FrameHeader({ title, showBack = false, className }: FrameHeaderProps) {
  return (
    <header className={cn('bg-surface border-b border-gray-200 px-4 py-3', className)}>
      <div className="flex items-center justify-between">
        {showBack && (
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
            ←
          </button>
        )}
        <h1 className="text-xl font-bold text-primary flex-1 text-center">
          {title}
        </h1>
        {showBack && <div className="w-10" />} {/* Spacer for centering */}
      </div>
    </header>
  )
}

