// Domain types for the tracking feature.
export type CourierId = 'flash' | 'thp' | 'kex'

export interface Courier {
  id: CourierId
  short: string
  name: string
  rule: string
  pattern: RegExp
  matchScore: number
  missScore: number
  missNote: string
  badgeText: string
}

export interface TimelineStep {
  icon: string
  title: string
  time: string
  desc: string
  state: 'pending' | 'active' | 'done'
  circle: string
}

export interface HistoryRow {
  tracking: string
  when: string
  courier: string
  courierClass: string
  dotClass: string
  receiver: string
  sender: string
  status: 'transit' | 'delivered' | 'pending'
  action: string
}
