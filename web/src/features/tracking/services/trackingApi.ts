import type { TrackingData } from '../types'

const SERVER_ERROR = 'Internal server error.'

/** Error carrying the message returned by the API (or a fallback). */
export class TrackingApiError extends Error {}

/** POST /api/tracking — resolves with `data`, rejects with TrackingApiError. */
export async function fetchTracking(trackingCode: string): Promise<TrackingData> {
  let res: Response
  try {
    res = await fetch('/api/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackingCode }),
    })
  } catch {
    throw new TrackingApiError(SERVER_ERROR)
  }

  const body = (await res.json().catch(() => null)) as { data?: TrackingData; error?: string } | null
  if (!res.ok || !body?.data) {
    throw new TrackingApiError(body?.error ?? SERVER_ERROR)
  }
  return body.data
}
