import OrderCard from "@/components/constants/OrderCard";
import BootomNav from "@/components/shared/BootomNav";

const orders = [
  {
    name: "Filan Fisteku",
    table: 3,
    status: "Ready",
    time: "12:45 PM",
    itemsCount: 3,
  },
  {
    name: "Blerta Kryeziu",
    table: 5,
    status: "In Progress",
    time: "12:55 PM",
    itemsCount: 2,
  },
  {
    name: "Amire Ademi",
    table: 1,
    status: "Ready",
    time: "13:10 PM",
    itemsCount: 4,
  },
  {
    name: "Egzon Halimi",
    table: 2,
    status: "In Progress",
    time: "13:20 PM",
    itemsCount: 1,
  },
  {
    name: " Blerta",
    table: 12,
    status: " In Progress",
    time: "13:20 PM",
    itemsCount: 1,
  },
];

export default function Orders() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {orders.map((order, i) => (
          <OrderCard key={i} {...order} />
        ))}
         <BootomNav/>
      </div>
    </div>
  );
}
