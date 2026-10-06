export const INVALID_TRACKING_MESSAGE = 'Invalid tracking code.'

// Alphanumeric (a-z, A-Z, 0-9), exactly 10 characters.
const TRACKING_CODE_PATTERN = /^[a-zA-Z0-9]{10}$/

/** Returns an error message, or null when the tracking code is valid. */
export function validateTrackingCode(code: string): string | null {
  return TRACKING_CODE_PATTERN.test(code) ? null : INVALID_TRACKING_MESSAGE
}
