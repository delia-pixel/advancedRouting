// import { useEffect, useState } from "react";

import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;
  if (data.isError) {
    <p>{data.message}</p>;
  }
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export const loader = async () => {
  const response = await fetch("http://localhost:8080/eventds");

  if (!response.ok) {
    //   return { isError: true, message: "Could not fetch events!" };
      throw new Response(
        JSON.stringify({ message: "Could not fetch events!" }),
      );
  } else {
    const resData = await response.json();
    return resData;
  }
};
