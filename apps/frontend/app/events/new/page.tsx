"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getApiBase } from "../../lib/api";

export default function NewEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    const res = await fetch(`${getApiBase()}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: description || null,
        start_time: startTime,
        end_time: endTime,
      }),
    });

    if (!res.ok) {
      setStatus("Failed to create event.");
      return;
    }

    const data = await res.json();
    router.push(`/events/${data.id}`);
  }

  return (
    <section>
      <h1>Create a new event</h1>
      <p className="note">Fill in the details and publish to the catalog.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </label>
        <label>
          Start time
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </label>
        <label>
          End time
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </label>
        <button type="submit">Publish event</button>
        {status && <p className="note">{status}</p>}
      </form>
    </section>
  );
}
