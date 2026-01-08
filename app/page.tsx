import { SubscriptionsTable } from "@/components/SubscriptionsTable";

export default function Home() {
  return (
    <main>
      <h1 className="font-bold text-3xl mt-6 mb-4">Subscriptions</h1>
      <SubscriptionsTable />
    </main>
  );
}
