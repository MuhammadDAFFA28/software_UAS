import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { formatCurrency } from '@/lib/utils'
import { paymentMethods } from '@/data/mockData'
import { Wallet, Check, Loader2, Banknote } from 'lucide-react'

const quickAmounts = [50000, 100000, 250000, 500000, 1000000, 2000000]

export function TopUp() {
  const [amount, setAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [step, setStep] = useState('input')
  const [isProcessing, setIsProcessing] = useState(false)

  const numericAmount = parseInt(amount.replace(/[^0-9]/g, '')) || 0

  const handleQuickAmount = (val) => {
    setAmount(val.toLocaleString('id-ID'))
  }

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw === '') {
      setAmount('')
      return
    }
    setAmount(parseInt(raw).toLocaleString('id-ID'))
  }

  const handleContinue = () => {
    if (numericAmount < 10000) return
    setStep('confirm')
  }

  const handleConfirm = async () => {
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsProcessing(false)
    setStep('success')
  }

  const handleReset = () => {
    setAmount('')
    setSelectedMethod(null)
    setStep('input')
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
              <h2 className="text-2xl font-bold">Top Up Successful!</h2>
              <p className="text-muted-foreground mt-1">
                {formatCurrency(numericAmount)} has been added to your wallet
              </p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 space-y-1">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-semibold">{selectedMethod?.name}</p>
            </div>
            <Button onClick={handleReset} className="w-full">
              Top Up Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Top Up</h1>
        <p className="text-muted-foreground">Add funds to your PayEasy wallet</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Amount</CardTitle>
          <CardDescription>Enter the amount you want to top up</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">Rp</span>
            <Input
              value={amount}
              onChange={handleAmountChange}
              className="h-14 text-2xl font-bold pl-12 pr-4 text-right"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((val) => (
              <Button
                key={val}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAmount(val)}
                className={`${
                  numericAmount === val
                    ? 'border-primary bg-primary/10 text-primary'
                    : ''
                }`}
              >
                Rp{val.toLocaleString('id-ID')}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Choose your payment source</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left ${
                  selectedMethod?.id === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-white/5 hover:border-white/20 bg-card/50'
                }`}
              >
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <p className="text-sm font-medium">{method.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{method.type}</p>
                </div>
                {selectedMethod?.id === method.id && (
                  <Check className="h-4 w-4 text-primary ml-auto" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleContinue}
        className="w-full h-12 text-base"
        disabled={numericAmount < 10000 || !selectedMethod}
      >
        <Banknote className="h-5 w-5 mr-2" />
        Continue Top Up
      </Button>

      {/* Confirmation Modal */}
      <Dialog open={step === 'confirm'} onOpenChange={(open) => !open && setStep('input')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Top Up</DialogTitle>
            <DialogDescription>Please review your top up details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/50">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-xl font-bold">{formatCurrency(numericAmount)}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/50">
              <span className="text-sm text-muted-foreground">Payment Method</span>
              <span className="font-medium">{selectedMethod?.name}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/50">
              <span className="text-sm text-muted-foreground">Fee</span>
              <span className="font-medium text-emerald-400">Free</span>
            </div>
            <div className="border-t border-white/5 pt-4 flex justify-between items-center">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold">{formatCurrency(numericAmount)}</span>
            </div>
          </div>
          <Button onClick={handleConfirm} className="w-full h-11" disabled={isProcessing}>
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              'Confirm Top Up'
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
