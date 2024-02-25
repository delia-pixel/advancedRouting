// import { useEffect, useState } from "react";

import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

export const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //   return { isError: true, message: "Could not fetch events!" };
    throw json({ message: "Could not fetch events!" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = async () => {
  return defer({
    events: loadEvents(),
  });
};
