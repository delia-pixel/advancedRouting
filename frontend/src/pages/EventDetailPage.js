import React, { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  console.log(event);

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={events} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

export const loadEvent = async (id) => {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fecth details for the selected event." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

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

export const loader = async ({ request, params }) => {
  const id = params.eventId;
  return defer({
    event: loadEvent(id),
    events: loadEvents(),
  });
};

export const action = async ({ params, request }) => {
  const eventId = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });
  if (!response.ok) {
    throw json({ message: "Could not delete the event." }, { status: 500 });
  }
  redirect("/events");
};
