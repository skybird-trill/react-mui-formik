import UserDetailsPage from "../pages/UserDetailsPage";
import UsersListPage from "../pages/UsersListPage";

import routeNames from "../constants/routeNames";

export const appRoutes = [
  { path: routeNames.Main, exact: true, component: UsersListPage },
  { path: routeNames.Add, component: UserDetailsPage },
  { path: routeNames.Details, component: UserDetailsPage },
  { redirect: routeNames.Main },
];
