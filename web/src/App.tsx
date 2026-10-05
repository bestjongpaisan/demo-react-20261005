import { useState } from 'react'
import { detectCourier } from './data'
import { Header } from './components/Header'
import { HistoryTable } from './components/HistoryTable'
import { MatchMatrix } from './components/MatchMatrix'
import { SearchHero } from './components/SearchHero'
import { ShipmentCard } from './components/ShipmentCard'
import { Sidebar } from './components/Sidebar'

const DEFAULT_TRACKING = 'TH2409857129EX'

export default function App() {
  const [input, setInput] = useState(DEFAULT_TRACKING)
  const [tracked, setTracked] = useState(DEFAULT_TRACKING)
  const matched = detectCourier(tracked)

  return (
    <>
      <Header />
      <main className="w-full pt-16 px-8 min-h-screen bg-background max-w-7xl mx-auto">
        <div className="flex flex-col w-full pb-16 space-y-10">
          <SearchHero
            value={input}
            onChange={setInput}
            onTrack={() => input.trim() && setTracked(input.trim().toUpperCase())}
          />
          <MatchMatrix matched={matched} />
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <ShipmentCard tracking={tracked} courierName={matched?.name ?? 'Unknown'} />
            </div>
            <Sidebar />
          </section>
          <HistoryTable
            activeTracking={tracked}
            onSelect={(t) => {
              setInput(t)
              setTracked(t)
            }}
          />
        </div>
      </main>
    </>
  )
}
