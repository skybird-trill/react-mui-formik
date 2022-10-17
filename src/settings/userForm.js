export const initialValues = {
  username: "",
  name: "",
  email: "",
  phone: "",
  website: "",
  company: {
    name: "",
    bs: "",
  },
};

export const validationSchema = {
  properties: {
    username: {
      type: "string",
      required: true,
      allowEmpty: false,
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
      required: true,
      allowEmpty: false,
      format: "email",
    },
    phone: {
      type: "string",
    },
    website: {
      type: "string",
      format: "url",
    },
  },
};
