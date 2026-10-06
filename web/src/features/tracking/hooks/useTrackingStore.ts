import { create } from 'zustand'
import { fetchTracking } from '../services/trackingApi'
import { validateTrackingCode } from '../services/validation'
import type { SearchStatus, TrackingData } from '../types'

interface TrackingState {
  /** Raw text currently typed in the search box. */
  input: string
  status: SearchStatus
  /** Message shown when validation or the API fails. */
  error: string | null
  /** Data returned by the API for the last successful search. */
  data: TrackingData | null
  setInput: (value: string) => void
  /** Validate the input, then call the API (flow 1, steps 3-6). */
  search: () => Promise<void>
  /** Fill the input with a code and search it immediately. */
  select: (trackingCode: string) => Promise<void>
}

export const initialTrackingState: Pick<TrackingState, 'input' | 'status' | 'error' | 'data'> = {
  input: '',
  status: 'idle',
  error: null,
  data: null,
}

export const useTrackingStore = create<TrackingState>((set, get) => ({
  ...initialTrackingState,
  setInput: (input) => set({ input }),
  search: async () => {
    const code = get().input.trim()
    const invalid = validateTrackingCode(code)
    if (invalid) {
      set({ status: 'error', error: invalid, data: null })
      return
    }
    set({ status: 'loading', error: null })
    try {
      const data = await fetchTracking(code)
      set({ status: 'success', data })
    } catch (e) {
      set({ status: 'error', error: e instanceof Error ? e.message : 'Internal server error.', data: null })
    }
  },
  select: async (trackingCode) => {
    set({ input: trackingCode })
    await get().search()
  },
}))
