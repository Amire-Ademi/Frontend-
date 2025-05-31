import BootomNav from '@/components/shared/BootomNav'
import WaiterForm from './WaiterForm'
import { WaiterTable } from './WaiterTable'

export default function WaiterMenagament() {
  return (
    <div className="space-y-4">
      <WaiterForm />
      <WaiterTable/>
      <BootomNav/>
    </div>
  )
}
