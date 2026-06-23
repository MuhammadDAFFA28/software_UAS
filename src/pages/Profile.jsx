import { useState, useContext } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ToastContext } from '@/contexts/ToastContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Phone, Shield, Calendar, CreditCard, Save, Loader2 } from 'lucide-react'

export function Profile() {
  const { user, updateUser } = useAuth()
  const { addToast } = useContext(ToastContext)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      addToast('Name and email are required', 'error')
      return
    }
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    updateUser(form)
    setIsSaving(false)
    setIsEditing(false)
    addToast('Profile updated successfully', 'success')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account information and security settings</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarFallback className="text-2xl">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">@{user?.username}</p>
              <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                <Badge variant="info">Verified</Badge>
                <Badge variant="secondary">Premium</Badge>
              </div>
            </div>
            <Button
              variant={isEditing ? 'outline' : 'default'}
              onClick={() => {
                if (isEditing) {
                  setForm({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
                }
                setIsEditing(!isEditing)
              }}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" /> Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={!isEditing}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input value={user?.username} disabled className="h-11" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={!isEditing}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                disabled={!isEditing}
                className="h-11"
              />
            </div>
            {isEditing && (
              <Button onClick={handleSave} className="w-full" disabled={isSaving}>
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                  </span>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user?.memberSince || '-'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Card Number</p>
                </div>
              </div>
              <span className="text-sm font-mono">•••• {user?.cardLastFour || '0000'}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email Verified</p>
                </div>
              </div>
              <Badge variant="success">Yes</Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone Verified</p>
                </div>
              </div>
              <Badge variant="success">Yes</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Security
          </CardTitle>
          <CardDescription>Manage your security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
            <div>
              <p className="text-sm font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
            <div>
              <p className="text-sm font-medium">Biometric Login</p>
              <p className="text-xs text-muted-foreground">Use fingerprint or face ID</p>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
            <div>
              <p className="text-sm font-medium">PIN Code</p>
              <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
