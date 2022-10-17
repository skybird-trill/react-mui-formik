import { useHistory, useParams } from "react-router-dom";

import UserFormComponent from "../../components/user/UserFormComponent"

import { HttpStatus } from "../../constants/http";

import {
  resourceUrl,
  mainRoute,
  getTitle,
  getActions,
} from "../../settings/userDetailsPage";

const UserDetailsPage = () => {
  const history = useHistory();

  const { id } = useParams();
  const userID = id && parseInt(id, 10);

  const submitCallback = (status, responseData) => {
    console.log(responseData);
    if ([HttpStatus.Success, HttpStatus.Created].includes(status)) {
      history.push(mainRoute);
    }
  };

  return (
    <UserFormComponent
      title={getTitle(userID)}
      actions={getActions(userID)}
      resourceUrl={resourceUrl}
      resourceId={userID}
      submitCallback={submitCallback}
    />
  );
 };

export default UserDetailsPage;
