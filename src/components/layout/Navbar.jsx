import { useAuth } from '@/hooks/useAuth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, Menu, Bell } from 'lucide-react'

export function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth()

  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-16 border-b border-white/5 bg-card/40 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Welcome back,</h2>
          <p className="text-base font-semibold">{user?.name || 'User'}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center shadow-lg shadow-primary/25">
            3
          </span>
        </Button>

        <div className="flex items-center gap-3 pl-3 border-l border-white/5">
          <Avatar className="h-9 w-9 ring-2 ring-primary/20">
            <AvatarFallback>
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
