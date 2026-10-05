import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { DEFAULT_TRACKING, useTrackingStore } from './features/tracking'

beforeEach(() => {
  useTrackingStore.setState({ input: DEFAULT_TRACKING, tracked: DEFAULT_TRACKING })
  window.scrollTo = vi.fn()
})

describe('App', () => {
  it('renders the default Flash Express match', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ค้นหาสถานะพัสดุอัจฉริยะ')
    expect(screen.getByText('MATCH CONFIRMED')).toBeInTheDocument()
    expect(screen.getByText('ความแม่นยำ 99.4%')).toBeInTheDocument()
  })

  it('switches courier when a sample chip is chosen and tracked', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /Thailand Post: EF582910482TH/ }))
    await user.click(screen.getByRole('button', { name: /ตรวจหาและติดตามพัสดุ/ }))
    expect(screen.getByText('ความแม่นยำ 99.8%')).toBeInTheDocument()
  })

  it('shows an error banner for an unknown tracking number', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByRole('textbox')
    await user.clear(input)
    await user.type(input, 'nope{Enter}')
    expect(screen.getByText(/ไม่พบผู้ให้บริการขนส่ง/)).toBeInTheDocument()
  })

  it('clear button empties the input', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByTitle('Clear input'))
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('history row action re-tracks that parcel', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getAllByRole('button', { name: 'ตรวจอีกครั้ง' })[0])
    expect(useTrackingStore.getState().tracked).toBe('EF582910482TH')
    expect(window.scrollTo).toHaveBeenCalled()
  })
})
