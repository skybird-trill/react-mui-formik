import UsersListComponent from "../../components/user/UsersListComponent"

import {
  resourceUrl,
  addRoute,
  detailsRoute,
} from "../../settings/usersListPage";

const UsersListPage = () => (
  <UsersListComponent
    resourceUrl={resourceUrl}
    addRoute={addRoute}
    detailsRoute={detailsRoute}
  />
);

export default UsersListPage;
