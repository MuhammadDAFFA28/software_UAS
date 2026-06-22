import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatCurrency } from '@/lib/utils'
import { mockRecipients } from '@/data/mockData'
import { Search, ArrowRight, Check, Loader2, Users, Banknote } from 'lucide-react'

export function Transfer() {
  const [search, setSearch] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState(null)
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [step, setStep] = useState('select')
  const [isProcessing, setIsProcessing] = useState(false)

  const numericAmount = parseInt(amount.replace(/[^0-9]/g, '')) || 0

  const filteredRecipients = mockRecipients.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search)
  )

  const frequentRecipients = mockRecipients.slice(0, 4)

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw === '') {
      setAmount('')
      return
    }
    setAmount(parseInt(raw).toLocaleString('id-ID'))
  }

  const handleSelectRecipient = (recipient) => {
    setSelectedRecipient(recipient)
    setStep('amount')
  }

  const handleContinue = () => {
    setStep('confirm')
  }

  const handleConfirm = async () => {
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsProcessing(false)
    setStep('success')
  }

  const handleReset = () => {
    setSelectedRecipient(null)
    setAmount('')
    setNote('')
    setStep('select')
  }

  if (step === 'success') {
    return (
      <div className="max-w-lg mx-auto mt-12 animate-scale-in">
        <Card className="text-center p-8">
          <CardContent className="pt-6 space-y-4">
            <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
              <Check className="h-10 w-10 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Transfer Successful!</h2>
              <p className="text-muted-foreground mt-1">
                {formatCurrency(numericAmount)} sent to {selectedRecipient?.name}
              </p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Recipient</span>
                <span className="font-medium">{selectedRecipient?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{formatCurrency(numericAmount)}</span>
              </div>
              {note && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Note</span>
                  <span className="font-medium">{note}</span>
                </div>
              )}
            </div>
            <Button onClick={handleReset} className="w-full">
              Send Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 'confirm') {
    return (
      <div className="max-w-lg mx-auto mt-12 animate-scale-in">
        <Card>
          <CardHeader>
            <CardTitle>Confirm Transfer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {selectedRecipient?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{selectedRecipient?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedRecipient?.phone}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between p-3 rounded-xl bg-secondary/50">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-lg">{formatCurrency(numericAmount)}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-secondary/50">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-medium text-emerald-400">Free</span>
              </div>
              <div className="border-t border-white/5 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">{formatCurrency(numericAmount)}</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setStep('amount')} className="flex-1">
                Back
              </Button>
              <Button onClick={handleConfirm} className="flex-1" disabled={isProcessing}>
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Confirm'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Transfer</h1>
        <p className="text-muted-foreground">Send money to your contacts</p>
      </div>

      {step === 'select' ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Frequent Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {frequentRecipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => handleSelectRecipient(recipient)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {recipient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xs font-medium text-center truncate w-full">
                      {recipient.name.split(' ')[0]}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-1 max-h-80 overflow-auto">
                {filteredRecipients.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No contacts found</p>
                ) : (
                  filteredRecipients.map((recipient) => (
                    <button
                      key={recipient.id}
                      onClick={() => handleSelectRecipient(recipient)}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-secondary transition-colors text-left"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {recipient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{recipient.name}</p>
                        <p className="text-xs text-muted-foreground">{recipient.phone}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setStep('select')}>
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
              <div>
                <CardTitle>Transfer Amount</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {selectedRecipient?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{selectedRecipient?.name}</p>
                <p className="text-xs text-muted-foreground">{selectedRecipient?.bank}</p>
              </div>
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">Rp</span>
              <Input
                value={amount}
                onChange={handleAmountChange}
                className="h-14 text-2xl font-bold pl-12 pr-4 text-right"
                placeholder="0"
              />
            </div>

            <Input
              placeholder="Add a note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="h-11"
            />

            <Button
              onClick={handleContinue}
              className="w-full h-11"
              disabled={numericAmount < 1000}
            >
              <Banknote className="h-4 w-4 mr-2" />
              Continue Transfer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
