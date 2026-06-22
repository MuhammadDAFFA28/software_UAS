import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { formatCurrency, formatDate } from '@/lib/utils'
import { mockTransactions } from '@/data/mockData'
import { Search, Download, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const ITEMS_PER_PAGE = 8

const typeIcons = {
  topup: ArrowUpRight,
  transfer: ArrowDownRight,
}

const statusBadge = {
  success: 'success',
  pending: 'warning',
  failed: 'destructive',
}

export function History() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('newest')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = [...mockTransactions]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (tx) =>
          tx.description.toLowerCase().includes(q) ||
          tx.id.toLowerCase().includes(q) ||
          (tx.recipient && tx.recipient.toLowerCase().includes(q))
      )
    }

    if (typeFilter !== 'all') {
      result = result.filter((tx) => tx.type === typeFilter)
    }

    if (statusFilter !== 'all') {
      result = result.filter((tx) => tx.status === statusFilter)
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [search, typeFilter, statusFilter, sortOrder])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const exportCSV = () => {
    const headers = ['ID', 'Type', 'Amount', 'Date', 'Description', 'Status']
    const rows = filtered.map((tx) => [
      tx.id,
      tx.type,
      tx.amount,
      tx.date,
      tx.description,
      tx.status,
    ])
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'payeasy_transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">View all your transactions</p>
        </div>
        <Button onClick={exportCSV} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" /> Export CSV
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-10 h-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1) }}>
              <SelectTrigger className="w-full md:w-36 h-10">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="topup">Top Up</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
              <SelectTrigger className="w-full md:w-36 h-10">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="h-10 w-10 shrink-0"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 px-2">Type</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 px-2">Description</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 px-2 hidden sm:table-cell">Date</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3 px-2">Amount</th>
                  <th className="text-center text-xs font-medium text-muted-foreground pb-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-muted-foreground">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  paginated.map((tx) => {
                    const Icon = typeIcons[tx.type]
                    return (
                      <tr key={tx.id} className="border-b border-white/5 hover:bg-secondary/20 transition-colors">
                        <td className="py-3 px-2">
                          <div className={`p-2 rounded-xl w-fit ${
                            tx.type === 'topup'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-violet-500/10 text-violet-400'
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <p className="text-sm font-medium">{tx.description}</p>
                          <p className="text-xs text-muted-foreground">{tx.id}</p>
                        </td>
                        <td className="py-3 px-2 hidden sm:table-cell">
                          <p className="text-sm text-muted-foreground">{formatDate(tx.date)}</p>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <p className={`text-sm font-semibold ${
                            tx.type === 'topup' ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {tx.type === 'topup' ? '+' : '-'}{formatCurrency(tx.amount)}
                          </p>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Badge variant={statusBadge[tx.status]} className="text-[10px] px-2 py-0.5">
                            {tx.status}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setPage(p)}
                    className="h-8 w-8 text-xs"
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
