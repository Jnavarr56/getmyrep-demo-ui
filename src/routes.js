import LocatedLayout from "./layouts/Located";
import UnlocatedLayout from "./layouts/Unlocated";

import Landing from "./views/Landing";
import Geolocation from "./views/Geolocation";
import AddressMatches from "./views/AddressMatches";

const routes = [
  {
    path: "/home",
    layout: LocatedLayout,
    view: () => <p>hi</p>,
    locationRequired: true,
  },
  {
    redirect: true,
    to: "/home",
    locationRequired: true,
  },
  {
    path: "/",
    layout: UnlocatedLayout,
    view: Landing,
    locationRequired: false,
  },
  {
    path: "/geolocation",
    layout: UnlocatedLayout,
    view: Geolocation,
    locationRequired: false,
  },
  {
    path: "/address-matches",
    layout: UnlocatedLayout,
    view: AddressMatches,
    locationRequired: false,
  },
  {
    redirect: true,
    to: "/",
    locationRequired: false,
  },
];

export default routes;
