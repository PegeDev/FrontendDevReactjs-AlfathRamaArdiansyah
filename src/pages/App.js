import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import DetailResto from "./detail-resto";
import ErrorPage from "./error-pages";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: `/resto/:id`,
      element: <DetailResto />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
