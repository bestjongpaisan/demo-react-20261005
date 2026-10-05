import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_TRACKING, useTrackingStore } from './useTrackingStore'

beforeEach(() => useTrackingStore.setState({ input: DEFAULT_TRACKING, tracked: DEFAULT_TRACKING }))

describe('useTrackingStore', () => {
  it('track() upper-cases and commits the input', () => {
    useTrackingStore.getState().setInput(' ef582910482th ')
    useTrackingStore.getState().track()
    expect(useTrackingStore.getState().tracked).toBe('EF582910482TH')
  })

  it('track() ignores blank input', () => {
    useTrackingStore.getState().setInput('   ')
    useTrackingStore.getState().track()
    expect(useTrackingStore.getState().tracked).toBe(DEFAULT_TRACKING)
  })

  it('select() sets both input and tracked', () => {
    useTrackingStore.getState().select('KEX99482019TH')
    expect(useTrackingStore.getState()).toMatchObject({ input: 'KEX99482019TH', tracked: 'KEX99482019TH' })
  })
})
