import Link from "next/link";
import { getApiBase } from "./lib/api";
import type { Event } from "./lib/types";

async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${getApiBase()}/events`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function HomePage() {
  const events = await fetchEvents();

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div className="badge">Live feed</div>
          <h1>Upcoming & recent events</h1>
          <p className="note">Track moments that matter. Click any card for details.</p>
        </div>
      </div>
      <div className="grid">
        {events.length === 0 ? (
          <div className="card">
            <h3>No events yet</h3>
            <p className="note">Create your first event to get started.</p>
            <Link href="/events/new">Create event →</Link>
          </div>
        ) : (
          events.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} className="card">
              <h3>{event.title}</h3>
              <p className="note">{event.description || "No description"}</p>
              <p className="note">
                {new Date(event.start_time).toLocaleString()} → {new Date(event.end_time).toLocaleString()}
              </p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
