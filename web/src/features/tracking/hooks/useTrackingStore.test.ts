import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as api from '../services/trackingApi'
import type { TrackingData } from '../types'
import { initialTrackingState, useTrackingStore } from './useTrackingStore'

const sample = { trackingCode: '1234567890' } as TrackingData

beforeEach(() => {
  useTrackingStore.setState(initialTrackingState)
  vi.restoreAllMocks()
})

describe('useTrackingStore.search', () => {
  it('TC001: valid code stores the retrieved data', async () => {
    const spy = vi.spyOn(api, 'fetchTracking').mockResolvedValue(sample)
    useTrackingStore.getState().setInput(' 1234567890 ')
    await useTrackingStore.getState().search()
    expect(spy).toHaveBeenCalledWith('1234567890')
    expect(useTrackingStore.getState()).toMatchObject({ status: 'success', data: sample, error: null })
  })

  it.each([
    ['TC002', '12345'],
    ['TC003', ''],
  ])('%s: "%s" shows an error without calling the API', async (_id, code) => {
    const spy = vi.spyOn(api, 'fetchTracking')
    useTrackingStore.getState().setInput(code)
    await useTrackingStore.getState().search()
    expect(spy).not.toHaveBeenCalled()
    expect(useTrackingStore.getState()).toMatchObject({ status: 'error', error: 'Invalid tracking code.', data: null })
  })

  it('surfaces API errors', async () => {
    vi.spyOn(api, 'fetchTracking').mockRejectedValue(new api.TrackingApiError('Internal server error.'))
    useTrackingStore.getState().setInput('1234567890')
    await useTrackingStore.getState().search()
    expect(useTrackingStore.getState()).toMatchObject({ status: 'error', error: 'Internal server error.' })
  })

  it('select() fills the input and searches', async () => {
    vi.spyOn(api, 'fetchTracking').mockResolvedValue(sample)
    await useTrackingStore.getState().select('1234567890')
    expect(useTrackingStore.getState()).toMatchObject({ input: '1234567890', status: 'success' })
  })
})
