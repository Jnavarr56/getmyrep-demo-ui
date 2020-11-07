import MainLayout from "./layouts/Main";
import Geolocation from "./views/Geolocation";
import AddressMatches from "./views/AddressMatches";

const routes = [
  {
    path: "/home",
    layout: MainLayout,
    view: () => <p>hi</p>,
    locationRequired: true,
  },
  {
    redirect: true,
    to: "/home",
    locationRequired: true,
  },
  {
    path: "/geolocation",
    layout: ({ children }) => children,
    view: Geolocation,
    locationRequired: false,
  },
  {
    path: "/address-matches",
    layout: ({ children }) => children,
    view: AddressMatches,
    locationRequired: false,
  },
  {
    redirect: true,
    to: "/geolocation",
    locationRequired: false,
  },
];

export default routes;
