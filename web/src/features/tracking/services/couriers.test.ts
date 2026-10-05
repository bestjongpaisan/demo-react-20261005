import { describe, expect, it } from 'vitest'
import { detectCourier } from './couriers'

describe('detectCourier', () => {
  it.each([
    ['TH2409857129EX', 'flash'],
    ['EF582910482TH', 'thp'],
    ['KEX99482019TH', 'kex'],
  ])('matches %s to %s', (number, id) => {
    expect(detectCourier(number)?.id).toBe(id)
  })

  it('normalises case and whitespace', () => {
    expect(detectCourier('  th2409857129ex ')?.id).toBe('flash')
  })

  it('returns undefined for unknown formats', () => {
    expect(detectCourier('hello')).toBeUndefined()
    expect(detectCourier('')).toBeUndefined()
  })
})
