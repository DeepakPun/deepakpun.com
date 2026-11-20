import Hero from "@/components/Hero"
import UpdateNotice from "@/components/UpdateNotice"

const PENDING_UPDATES: string[] = [
  'Grafana dashboard for labs shows status down, needs address update',
  'Notes need to be updated to say using mongo docker image not atlas'
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <UpdateNotice updates={PENDING_UPDATES} />
      <Hero />
    </div>
  )
}
