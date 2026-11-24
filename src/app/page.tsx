import Hero from "@/components/Hero"
import UpdateNotice from "@/components/UpdateNotice"

const PENDING_UPDATES: string[] = []

export default function Home() {
  return (
    <div className="flex flex-col">
      <UpdateNotice updates={PENDING_UPDATES} />
      <Hero />
    </div>
  )
}
