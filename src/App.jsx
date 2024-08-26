import { createHashRouter, RouterProvider } from "react-router-dom";
import { MainContextProvider } from "./contexts/MainContext";
import { currentLang, getCountryDetails } from "./utils.js";
import Checkout from "./pages/Checkout.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import { useState } from "react";

const router = createHashRouter([
  {
    path: "",
    element: <Checkout />,
  },
  {
    path: "/thankyou",
    element: <Success />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
  },
]);

export default function App() {
  const [country, setCountry] = useState(getCountryDetails(currentLang));
  return (
    <MainContextProvider value={{ country, setCountry }}>
      <RouterProvider router={router} />
    </MainContextProvider>
  );
}
