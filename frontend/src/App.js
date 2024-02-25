import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction
} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import { action as manipulateEventAction } from "./components/EventForm";
import EditEventPage from "./pages/EditEventPage";
import RootPage from "./pages/RootPage";
import EventsRootPage from "./pages/EventsRootPage";
import { loader as eventLoader } from "./pages/EventsPage";
import Error from "./pages/Error";
import NewsletterPage, { action as newsletterAction } from "./pages/NewsLetter";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <Error />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <EventsRootPage />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: eventLoader,
            },
            {
              path: ":eventId",
              id: "event-detail",
              loader: eventDetailLoader,
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                  action: manipulateEventAction,
                },
              ],
            },
            {
              path: "new",
              element: <NewEventPage />,
              action: manipulateEventAction,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
