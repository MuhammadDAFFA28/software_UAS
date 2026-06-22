import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowUpFromLine, ArrowRightFromLine, History, User, Settings, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/topup', icon: ArrowUpFromLine, label: 'Top Up' },
  { to: '/transfer', icon: ArrowRightFromLine, label: 'Transfer' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar({ className }) {
  return (
    <aside className={cn('flex flex-col h-full', className)}>
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="h-10 w-10 rounded-xl gradient-blue flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Wallet className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">PayEasy</h1>
          <p className="text-xs text-muted-foreground">Digital Wallet</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'nav-link-active shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/5">
        <p className="text-xs text-muted-foreground">PayEasy v1.0.0</p>
      </div>
    </aside>
  )
}
