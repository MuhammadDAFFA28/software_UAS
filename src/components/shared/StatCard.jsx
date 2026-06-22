import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function StatCard({ title, value, icon: Icon, trend, trendValue, color = 'blue', className }) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/20',
    emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20',
    violet: 'from-violet-500/20 to-violet-600/5 border-violet-500/20',
    amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20',
    rose: 'from-rose-500/20 to-rose-600/5 border-rose-500/20',
  }

  const iconColors = {
    blue: 'text-blue-400 bg-blue-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10',
    violet: 'text-violet-400 bg-violet-500/10',
    amber: 'text-amber-400 bg-amber-500/10',
    rose: 'text-rose-400 bg-rose-500/10',
  }

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br hover-lift', colorClasses[color], className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 text-xs">
              {trend === 'up' ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
              )}
              <span className={trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}>
                {trendValue}
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-xl', iconColors[color])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  )
}
