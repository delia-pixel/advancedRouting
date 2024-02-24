import React from 'react'
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function RootPage() {
  return (
      <>
          <MainNavigation/>
      <Outlet/>
    </>
  )
}

export default RootPage
