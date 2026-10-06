import { HistoryTable, MatchMatrix, SearchHero, ShipmentCard, Sidebar, useTrackingStore } from './features/tracking'
import { Header } from './shared/components/Header'

export default function App() {
  const { input, status, error, data, setInput, search, select } = useTrackingStore()

  return (
    <>
      <Header />
      <main className="w-full pt-16 px-8 min-h-screen bg-background max-w-7xl mx-auto">
        <div className="flex flex-col w-full pb-16 space-y-10">
          <SearchHero value={input} onChange={setInput} onTrack={search} loading={status === 'loading'} error={error} />
          {status === 'success' && data && (
            <>
              <MatchMatrix matchedId={data.courierId} />
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <ShipmentCard data={data} />
                </div>
                <Sidebar />
              </section>
            </>
          )}
          <HistoryTable activeTracking={data?.trackingCode} onSelect={select} />
        </div>
      </main>
    </>
  )
}
