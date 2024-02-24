import React from 'react'
import { Outlet } from 'react-router-dom';
import EventsNavigation from '../components/EventsNavigation';

function EventsRootPage() {
  return (
    <>
          <EventsNavigation />
          <Outlet/>
    </>
  )
}

export default EventsRootPage
