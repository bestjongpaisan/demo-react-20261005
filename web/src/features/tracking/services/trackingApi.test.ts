import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchTracking, TrackingApiError } from './trackingApi'

const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status })

afterEach(() => vi.unstubAllGlobals())

describe('fetchTracking', () => {
  it('POSTs the code and returns data on 200', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json(200, { data: { trackingCode: '1234567890' } }))
    vi.stubGlobal('fetch', fetchMock)
    await expect(fetchTracking('1234567890')).resolves.toEqual({ trackingCode: '1234567890' })
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/tracking',
      expect.objectContaining({ method: 'POST', body: '{"trackingCode":"1234567890"}' }),
    )
  })

  it('throws the API error message on 400', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json(400, { error: 'Invalid tracking code.' })))
    await expect(fetchTracking('x')).rejects.toThrow('Invalid tracking code.')
  })

  it('maps network failure to a server error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')))
    await expect(fetchTracking('1234567890')).rejects.toBeInstanceOf(TrackingApiError)
  })
})
