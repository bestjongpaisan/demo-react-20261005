import { describe, expect, it } from 'vitest'
import { INVALID_TRACKING_MESSAGE, validateTrackingCode } from './validation'

describe('validateTrackingCode', () => {
  it.each(['1234567890', 'TH24098571', 'abcDEF1234'])('accepts %s', (code) => {
    expect(validateTrackingCode(code)).toBeNull()
  })

  it.each(['', '12345', '12345678901', '12345-7890', '123456789 '])('rejects "%s"', (code) => {
    expect(validateTrackingCode(code)).toBe(INVALID_TRACKING_MESSAGE)
  })
})
