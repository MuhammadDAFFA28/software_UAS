export const mockUser = {
  id: 'USR001',
  name: 'Alex Chandra',
  username: 'alexchandra',
  email: 'alex.chandra@email.com',
  phone: '081234567890',
  avatar: null,
  balance: 15850000,
  totalTopUp: 25000000,
  totalTransfer: 9150000,
  cardLastFour: '4829',
  memberSince: '2024-01-15',
}

export const mockTransactions = [
  { id: 'TRX001', type: 'topup', amount: 500000, date: '2026-06-22T09:30:00', description: 'Top Up from Bank BCA', status: 'success' },
  { id: 'TRX002', type: 'transfer', amount: 150000, date: '2026-06-22T08:15:00', description: 'Transfer to Sarah Wijaya', status: 'success', recipient: 'Sarah Wijaya' },
  { id: 'TRX003', type: 'topup', amount: 1000000, date: '2026-06-21T14:20:00', description: 'Top Up from Bank Mandiri', status: 'success' },
  { id: 'TRX004', type: 'transfer', amount: 250000, date: '2026-06-21T11:45:00', description: 'Transfer to Budi Hartono', status: 'success', recipient: 'Budi Hartono' },
  { id: 'TRX005', type: 'transfer', amount: 50000, date: '2026-06-20T19:30:00', description: 'Transfer to Dewi Lestari', status: 'success', recipient: 'Dewi Lestari' },
  { id: 'TRX006', type: 'topup', amount: 2000000, date: '2026-06-20T10:00:00', description: 'Top Up from Bank BRI', status: 'success' },
  { id: 'TRX007', type: 'transfer', amount: 75000, date: '2026-06-19T16:45:00', description: 'Transfer to Rudi Hermawan', status: 'success', recipient: 'Rudi Hermawan' },
  { id: 'TRX008', type: 'topup', amount: 500000, date: '2026-06-19T08:30:00', description: 'Top Up from Bank BNI', status: 'pending' },
  { id: 'TRX009', type: 'transfer', amount: 500000, date: '2026-06-18T13:20:00', description: 'Transfer to Maya Indah', status: 'success', recipient: 'Maya Indah' },
  { id: 'TRX010', type: 'topup', amount: 1500000, date: '2026-06-18T07:15:00', description: 'Top Up from Bank BCA', status: 'success' },
  { id: 'TRX011', type: 'transfer', amount: 200000, date: '2026-06-17T20:00:00', description: 'Transfer to Agus Prasetyo', status: 'failed', recipient: 'Agus Prasetyo' },
  { id: 'TRX012', type: 'transfer', amount: 350000, date: '2026-06-17T10:30:00', description: 'Transfer to Linda Kusuma', status: 'success', recipient: 'Linda Kusuma' },
  { id: 'TRX013', type: 'topup', amount: 750000, date: '2026-06-16T15:45:00', description: 'Top Up from Bank Mandiri', status: 'success' },
  { id: 'TRX014', type: 'transfer', amount: 125000, date: '2026-06-16T09:00:00', description: 'Transfer to Tommy Gunawan', status: 'success', recipient: 'Tommy Gunawan' },
  { id: 'TRX015', type: 'topup', amount: 3000000, date: '2026-06-15T11:30:00', description: 'Top Up from Bank BCA', status: 'success' },
]

export const mockRecipients = [
  { id: 'REC001', name: 'Sarah Wijaya', phone: '081298765432', avatar: null, bank: 'BCA' },
  { id: 'REC002', name: 'Budi Hartono', phone: '087812345678', avatar: null, bank: 'Mandiri' },
  { id: 'REC003', name: 'Dewi Lestari', phone: '085611223344', avatar: null, bank: 'BNI' },
  { id: 'REC004', name: 'Rudi Hermawan', phone: '082134567890', avatar: null, bank: 'BRI' },
  { id: 'REC005', name: 'Maya Indah', phone: '081923456789', avatar: null, bank: 'BCA' },
  { id: 'REC006', name: 'Linda Kusuma', phone: '087756789012', avatar: null, bank: 'Mandiri' },
  { id: 'REC007', name: 'Tommy Gunawan', phone: '085534567890', avatar: null, bank: 'CIMB' },
  { id: 'REC008', name: 'Agus Prasetyo', phone: '082278901234', avatar: null, bank: 'BNI' },
]

export const monthlyTransactions = [
  { month: 'Jan', topup: 4000000, transfer: 1500000 },
  { month: 'Feb', topup: 3500000, transfer: 2000000 },
  { month: 'Mar', topup: 5000000, transfer: 1800000 },
  { month: 'Apr', topup: 4500000, transfer: 2200000 },
  { month: 'May', topup: 6000000, transfer: 2500000 },
  { month: 'Jun', topup: 5500000, transfer: 2100000 },
]

export const notificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  weeklyReport: false,
  transactionAlert: true,
  promoNotifications: false,
}

export const securitySettings = {
  twoFactorEnabled: false,
  biometricEnabled: true,
  pinChangeRequired: false,
}

export const paymentMethods = [
  { id: 'bca', name: 'Bank BCA', icon: '🏦', type: 'bank' },
  { id: 'mandiri', name: 'Bank Mandiri', icon: '🏛️', type: 'bank' },
  { id: 'bni', name: 'Bank BNI', icon: '🏢', type: 'bank' },
  { id: 'bri', name: 'Bank BRI', icon: '🏗️', type: 'bank' },
  { id: 'gopay', name: 'GoPay', icon: '💚', type: 'ewallet' },
  { id: 'dana', name: 'DANA', icon: '💙', type: 'ewallet' },
  { id: 'ovo', name: 'OVO', icon: '💜', type: 'ewallet' },
]
