import MainLayout from "./layouts/Main";
import LandingLayout from "./layouts/Landing";

import LandingView from "./views/Landing";
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
    layout: LandingLayout,
    view: Geolocation,
    locationRequired: false,
  },
  {
    path: "/address-matches",
    layout: LandingLayout,
    view: AddressMatches,
    locationRequired: false,
  },
  {
    path: "/",
    layout: LandingLayout,
    view: LandingView,
    locationRequired: false,
  },
  {
    redirect: true,
    to: "/",
    locationRequired: false,
  },
];

export default routes;
