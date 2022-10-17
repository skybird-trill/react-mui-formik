import PropTypes from "prop-types";

import ListComponent from "../../ListComponent"
import UserListItemComponent from "../UserListItemComponent"
import AddUserListItemComponent from "../AddUserListItemComponent"

const UsersListComponent = ({
  resourceUrl,
  addRoute,
  detailsRoute,
}) => (
  <ListComponent
    resourceUrl={resourceUrl}
    title="Users list"
    ItemComponent={props => (
      <UserListItemComponent
        key={props.id}
        userData={props}
        route={detailsRoute}
      />
    )}
    AddItemComponent={() => (
      <AddUserListItemComponent
        key="add"
        route={addRoute}
      />
    )}
  />
);

export default UsersListComponent;

UsersListComponent.defaultProps = {
  addRoute: "",
  detailsRoute: "",
};

UsersListComponent.propTypes = {
  resourceUrl: PropTypes.string.isRequired,
  addRoute: PropTypes.string,
  detailsRoute: PropTypes.string,
};
