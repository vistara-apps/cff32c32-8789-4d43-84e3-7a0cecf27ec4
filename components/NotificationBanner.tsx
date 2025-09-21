import { cn } from '@/utils/cn'

interface NotificationBannerProps {
  type: 'scoreUpdate' | 'gameEvent'
  message: string
  onDismiss?: () => void
  className?: string
}

export function NotificationBanner({ type, message, onDismiss, className }: NotificationBannerProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'scoreUpdate':
        return 'bg-primary text-white'
      case 'gameEvent':
        return 'bg-accent text-black'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={cn(
      'px-4 py-3 rounded-lg flex items-center justify-between',
      getTypeStyles(),
      className
    )}>
      <span className="text-sm font-medium">{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 text-current hover:opacity-75 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  )
}

