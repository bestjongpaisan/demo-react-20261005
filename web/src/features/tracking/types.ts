// Domain types for the tracking feature.
export type CourierId = 'flash' | 'thp' | 'kex'

/** Courier display config used by the match matrix. */
export interface Courier {
  id: CourierId
  short: string
  name: string
  rule: string
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
}

export interface Party {
  name: string
  address: string
}

/** Payload of `data` in a 200 response from POST /api/tracking. */
export interface TrackingData {
  trackingCode: string
  courierId: CourierId
  courierName: string
  description: string
  weightKg: number
  eta: string
  sender: Party
  receiver: Party
  timeline: TimelineStep[]
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

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error'
