import { NextResponse } from "next/server";

const subscriptions = [
  { id: "1", status: "active" },
  { id: "2", status: "cancelled" },
];

export async function GET() {
  return NextResponse.json(subscriptions);
}

export async function POST() {
  const newSub = {
    id: Date.now().toString(),
    status: "active",
  };

  subscriptions.push(newSub);

  return NextResponse.json(newSub);
}

export async function PATCH() {
  const active = subscriptions.find((s) => s.status === "active");

  if (active) {
    active.status = "cancelled";
  }

  return NextResponse.json(active ?? null);
}
