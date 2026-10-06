import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { initialTrackingState, useTrackingStore } from './features/tracking'
import type { TrackingData } from './features/tracking/types'

const data: TrackingData = {
  trackingCode: '1234567890',
  courierId: 'flash',
  courierName: 'Flash Express',
  description: 'พัสดุทดสอบ',
  weightKg: 2,
  eta: 'พรุ่งนี้',
  sender: { name: 'ผู้ส่งทดสอบ', address: 'กทม.' },
  receiver: { name: 'ผู้รับทดสอบ', address: 'เชียงใหม่' },
  timeline: [{ icon: 'inventory_2', title: 'เข้ารับพัสดุแล้ว', time: 'เมื่อวาน', desc: '', state: 'done' }],
}

const respond = (status: number, body: unknown) => new Response(JSON.stringify(body), { status })

beforeEach(() => {
  useTrackingStore.setState(initialTrackingState)
  window.scrollTo = vi.fn()
})
afterEach(() => vi.unstubAllGlobals())

describe('Flow 1: search by tracking code', () => {
  it('TC001: valid code displays the retrieved data', async () => {
    const fetchMock = vi.fn().mockResolvedValue(respond(200, { data }))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByRole('textbox'), '1234567890')
    await user.click(screen.getByRole('button', { name: /ตรวจหาและติดตามพัสดุ/ }))

    expect(await screen.findByText('พัสดุทดสอบ')).toBeInTheDocument()
    expect(screen.getByText('ผู้รับทดสอบ')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it.each([
    ['TC002', '12345'],
    ['TC003', ''],
  ])('%s: "%s" shows the validation error and skips the API', async (_id, code) => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<App />)

    if (code) await user.type(screen.getByRole('textbox'), code)
    await user.click(screen.getByRole('button', { name: /ตรวจหาและติดตามพัสดุ/ }))

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid tracking code.')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('shows the API error message on a 500 response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respond(500, { error: 'Internal server error.' })))
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByRole('textbox'), '1234567890{Enter}')

    expect(await screen.findByRole('alert')).toHaveTextContent('Internal server error.')
  })

  it('clear button empties the input', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByRole('textbox'), 'abc')
    await user.click(screen.getByTitle('Clear input'))
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('history row action searches that parcel', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respond(200, { data })))
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getAllByRole('button', { name: 'ตรวจอีกครั้ง' })[0])
    expect(await screen.findByText('พัสดุทดสอบ')).toBeInTheDocument()
    expect(window.scrollTo).toHaveBeenCalled()
  })
})
