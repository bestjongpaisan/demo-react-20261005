import { create } from 'zustand'

export const DEFAULT_TRACKING = 'TH2409857129EX'

interface TrackingState {
  /** Raw text currently typed in the search box. */
  input: string
  /** Normalised tracking number that was last submitted. */
  tracked: string
  setInput: (value: string) => void
  /** Submit the current input; ignores blank input. */
  track: () => void
  /** Jump straight to a tracking number (e.g. from the history table). */
  select: (tracking: string) => void
}

export const useTrackingStore = create<TrackingState>((set, get) => ({
  input: DEFAULT_TRACKING,
  tracked: DEFAULT_TRACKING,
  setInput: (input) => set({ input }),
  track: () => {
    const value = get().input.trim()
    if (value) set({ tracked: value.toUpperCase() })
  },
  select: (tracking) => set({ input: tracking, tracked: tracking }),
}))
