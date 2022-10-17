import PropTypes from "prop-types";

import { TextField, Typography, Stack } from "@mui/material";

import FormComponent from "../../FormComponent"

import {
  initialValues,
  validationSchema,
} from "../../../settings/userForm";

 const UserFormComponent = ({
  title,
  actions,
  resourceUrl,
  resourceId,
  submitCallback,
 }) => {
  return (
    <FormComponent
      resourceUrl={resourceUrl}
      resourceId={resourceId}
      title={title}
      initialValues={initialValues}
      validationSchema={validationSchema}
      actions={actions}
      submitCallback={submitCallback}
    >
      <Typography component="h6" variant="h6">Contacts</Typography>
      <Stack spacing={2} sx={{ pl: 2 }}>
        <TextField
          id="username"
          name="username"
          label="Username"
        />
        <TextField
          id="name"
          name="name"
          label="Name"
        />
        <TextField
          id="email"
          name="email"
          label="Email"
        />
        <TextField
          id="phone"
          name="phone"
          label="Phone"
        />
        <TextField
          id="website"
          name="website"
          label="Website"
        />
      </Stack>
      <Typography component="h6" variant="h6">User's company</Typography>
      <Stack spacing={2} sx={{ pl: 2 }}>
        <TextField
          id="company.name"
          name="company.name"
          label="Company name"
        />
        <TextField
          id="company.bs"
          name="company.bs"
          label="Business"
        />
      </Stack>
    </FormComponent>
  );
}

export default UserFormComponent;

UserFormComponent.defaultProps = {
  resourceId: null,
  title: "",
  actions: [],
  submitCallback: () => {},
};

UserFormComponent.propTypes = {
  resourceUrl: PropTypes.string.isRequired,
  resourceId: PropTypes.number,
  title: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    type: PropTypes.oneOf(["button", "submit"]),
  })),
  submitCallback: PropTypes.func,
};
