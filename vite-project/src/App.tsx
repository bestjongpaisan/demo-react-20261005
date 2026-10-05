import { useState } from 'react'
import Header from './components/Header'
import SearchHero from './components/SearchHero'
import CourierMatch from './components/CourierMatch'
import ShipmentStatus from './components/ShipmentStatus'
import HistoryTable from './components/HistoryTable'

const DEFAULT_TRACKING = 'TH2409857129EX'

export default function App() {
  const [input, setInput] = useState(DEFAULT_TRACKING)
  const [tracked, setTracked] = useState(DEFAULT_TRACKING)

  const track = () => {
    const v = input.trim().toUpperCase()
    if (v) setTracked(v)
  }

  const select = (t: string) => {
    setInput(t)
    setTracked(t)
  }

  return (
    <>
      <Header />
      <main className="w-full pt-16 px-8 min-h-screen bg-background max-w-7xl mx-auto">
        <div className="flex flex-col w-full pb-16 space-y-10">
          <SearchHero value={input} onChange={setInput} onTrack={track} />
          <CourierMatch query={tracked} />
          <ShipmentStatus tracking={tracked} />
          <HistoryTable onSelect={select} />
        </div>
      </main>
    </>
  )
}
