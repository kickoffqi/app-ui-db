import Link from "next/link";
import { notFound } from "next/navigation";
import { getApiBase } from "../../lib/api";
import type { Event } from "../../lib/types";

async function fetchEvent(id: string): Promise<Event | null> {
  const res = await fetch(`${getApiBase()}/events/${id}`, { cache: "no-store" });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await fetchEvent(params.id);
  if (!event) {
    notFound();
  }

  return (
    <div className="card">
      <div className="badge">Event detail</div>
      <h1>{event.title}</h1>
      <p>{event.description || "No description provided."}</p>
      <p className="note">
        Starts: {new Date(event.start_time).toLocaleString()}
      </p>
      <p className="note">
        Ends: {new Date(event.end_time).toLocaleString()}
      </p>
      <Link href="/">← Back to list</Link>
    </div>
  );
}
