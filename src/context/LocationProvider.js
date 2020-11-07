import React, { createContext, useReducer, useMemo } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { reducer, initialState } from "../reducers/locationReducer";
import routes from "../routes";

const renderRoutes = routes.reduce((sorted, route, i) => {
  const { locationRequired, redirect, to, path } = route;
  const key = `${path || to}-${i}`;
  const routeEl = redirect ? (
    <Redirect key={key} to={to} />
  ) : (
    <Route key={key} path={path}>
      <route.layout path={path}>
        <route.view />
      </route.layout>
    </Route>
  );
  const routeType = locationRequired ? "locatedRoutes" : "unlocatedRoutes";
  if (!sorted[routeType]) sorted[routeType] = [];
  sorted[routeType].push(routeEl);
  return sorted;
}, {});

console.log(renderRoutes);

const LocationContext = createContext();

const LocationContextProvider = () => {
  const [locationState, locationDispatch] = useReducer(reducer, initialState);

  const locationContextValue = useMemo(
    () => ({ locationState, locationDispatch }),
    [locationState]
  );

  const {
    addressMatches,
    selectedAddressIndex,
    coords,
  } = locationContextValue.locationState;

  const isUserLocated = Boolean(
    addressMatches.length > 0 &&
      selectedAddressIndex !== null &&
      coords.lat &&
      coords.lng
  );

  console.log(isUserLocated);
  return (
    <BrowserRouter>
      <Switch>
        <LocationContext.Provider value={locationContextValue}>
          {isUserLocated
            ? renderRoutes.locatedRoutes
            : renderRoutes.unlocatedRoutes}
        </LocationContext.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export { LocationContext };
export default LocationContextProvider;