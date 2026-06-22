import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatCard } from '@/components/shared/StatCard'
import { TransactionChart } from '@/components/charts/TransactionChart'
import { DashboardSkeleton } from '@/components/shared/LoadingSkeleton'
import { formatCurrency, formatDate } from '@/lib/utils'
import { mockTransactions, monthlyTransactions } from '@/data/mockData'
import { Wallet, ArrowUpFromLine, ArrowRightFromLine, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const typeColors = {
  topup: 'success',
  transfer: 'info',
}

const typeIcons = {
  topup: ArrowUpRight,
  transfer: ArrowDownRight,
}

export function Dashboard() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <DashboardSkeleton />

  const recentTransactions = mockTransactions.slice(0, 5)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Balance Card */}
      <Card className="gradient-blue border-0 shadow-xl shadow-blue-500/20">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-200 mb-2">
                <Wallet className="h-4 w-4" />
                <span className="text-sm font-medium">Total Balance</span>
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white">
                {formatCurrency(user?.balance || 0)}
              </p>
              <p className="text-blue-200 text-sm mt-1">Available balance</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="bg-white/15 text-white hover:bg-white/25 border-0">
                <ArrowUpFromLine className="h-4 w-4 mr-1" /> Top Up
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/15 text-white hover:bg-white/25 border-0">
                <ArrowRightFromLine className="h-4 w-4 mr-1" /> Transfer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Top Up"
          value={formatCurrency(user?.totalTopUp || 0)}
          icon={ArrowUpFromLine}
          color="emerald"
          trend="up"
          trendValue="12.5%"
        />
        <StatCard
          title="Total Transfer"
          value={formatCurrency(user?.totalTransfer || 0)}
          icon={ArrowRightFromLine}
          color="violet"
          trend="down"
          trendValue="3.2%"
        />
        <StatCard
          title="Monthly Volume"
          value="Rp7.6jt"
          icon={TrendingUp}
          color="amber"
          trend="up"
          trendValue="8.1%"
        />
        <StatCard
          title="Transactions"
          value="128"
          icon={Wallet}
          color="rose"
          trend="up"
          trendValue="22.3%"
        />
      </div>

      {/* Chart and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionChart data={monthlyTransactions} />
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {recentTransactions.map((tx) => {
                const Icon = typeIcons[tx.type] || ArrowUpRight
                return (
                  <div key={tx.id} className="flex items-center gap-3 px-6 py-3.5 hover:bg-secondary/30 transition-colors">
                    <div className={`p-2 rounded-xl ${
                      tx.type === 'topup'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-violet-500/10 text-violet-400'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${
                        tx.type === 'topup' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {tx.type === 'topup' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </p>
                      <Badge variant={tx.status === 'success' ? 'success' : tx.status === 'pending' ? 'warning' : 'destructive'} className="text-[10px] px-1.5 py-0">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
