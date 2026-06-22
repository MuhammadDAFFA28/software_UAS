import { useState, useContext } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { ToastContext } from '@/contexts/ToastContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Moon, Sun, Bell, BellOff, Mail, Smartphone, FileText, Gift, Shield, LogOut } from 'lucide-react'
import { notificationSettings as defaultNotifs } from '@/data/mockData'
import { useAuth } from '@/hooks/useAuth'

export function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { addToast } = useContext(ToastContext)
  const { logout } = useAuth()
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('payeasy_notifications')
    return stored ? JSON.parse(stored) : defaultNotifs
  })

  const toggleNotification = (key) => {
    const updated = { ...notifications, [key]: !notifications[key] }
    setNotifications(updated)
    localStorage.setItem('payeasy_notifications', JSON.stringify(updated))
    addToast('Notification preferences updated', 'success')
  }

  const notifItems = [
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail },
    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications on your device', icon: Smartphone },
    { key: 'weeklyReport', label: 'Weekly Report', desc: 'Get a weekly summary of your transactions', icon: FileText },
    { key: 'transactionAlert', label: 'Transaction Alerts', desc: 'Get notified for every transaction', icon: Bell },
    { key: 'promoNotifications', label: 'Promo & Offers', desc: 'Receive promotional offers and updates', icon: Gift },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your experience</p>
      </div>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            Theme
          </CardTitle>
          <CardDescription>Switch between dark and light mode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-blue-400" />
              ) : (
                <Sun className="h-5 w-5 text-amber-400" />
              )}
              <div>
                <p className="text-sm font-medium">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                <p className="text-xs text-muted-foreground">
                  {theme === 'dark' ? 'Currently using dark theme' : 'Currently using light theme'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="min-w-[100px]"
            >
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notification Preferences
          </CardTitle>
          <CardDescription>Control what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {notifItems.map((item) => {
            const Icon = item.icon
            const isEnabled = notifications[item.key]
            return (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${isEnabled ? 'text-blue-400' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                    isEnabled ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      isEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start h-11" onClick={() => addToast('Password changed successfully', 'success')}>
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start h-11">
            Delete Account
          </Button>
          <Separator />
          <Button variant="destructive" className="w-full justify-start h-11" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
