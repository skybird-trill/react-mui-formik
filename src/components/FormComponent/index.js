import {
  Children,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";

import { useFormik } from "formik";
import revalidator from "revalidator";
import classNames from "classnames";
import { useSnackbar } from "notistack";

import Divider from "@mui/material/Divider";

import LoadingOverlayComponent from "../LoadingOverlayComponent";
import TitleComponent from "../TitleComponent";

import useFetchFromApi from "../../hooks/useFetchFromApi";
import useSaveToApi from "../../hooks/useSaveToApi";

import ResourceService from "../../utils/resourceService";
import connectToFormik from "../../utils/connectToFormik";
import { HttpStatus } from "../../constants/http";

import {
  StyledFormHeader,
  StyledFormBody,
  StyledFormFooter,
  StyledLoadingButton,
} from "./style";

const FormComponent = ({
  resourceUrl,
  resourceId,
  queryParams,
  title,
  titleTooltip,
  children,
  initialValues,
  validationSchema,
  validateOnBlur,
  validateOnChange,
  showDivider,
  actions,
  actionsPosition,
  beforeSubmitCallback,
  submitCallback,
  successMessage,
  errorMessage,
  fetchErrorMessage,
}) => {
  const [formData, setFormData] = useState(null);
  const [shouldSave, setShouldSave] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const resourceService = new ResourceService(
    resourceId ? `${resourceUrl}${resourceId}/` : resourceUrl,
  );

  const {
    isLoading,
    responseData: fetchData,
    responseError: fetchError,
    responseStatus: fetchStatus,
  } = useFetchFromApi(
    resourceService,
    queryParams,
    false,
    !resourceId,
  );

  const {
    responseData: saveData,
    responseError: saveError,
    responseStatus: saveStatus,
  } = useSaveToApi(
    resourceService,
    formData,
    shouldSave,
  );

  const initialFormData = useMemo(() => {
    let data;
    if (Object.keys(saveData).length) {
      data = saveData;
    } else if (Object.keys(fetchData).length) {
      data = fetchData;
    } else {
      data = initialValues;
    }

    return data;
  }, [saveData, fetchData, initialValues]);

  const validate = (formValues) => {
    const validationResult = revalidator.validate(formValues, validationSchema);

    const validationErrors = validationResult.errors.reduce((result, { property, message }) => (
      { ...result, [property]: message }
    ), {});

    return validationErrors;
  };

  const onSubmit = (data) => {
    if (beforeSubmitCallback) {
      beforeSubmitCallback();
    }
    setFormData(data);
    setShouldSave(true);
  };

  const {
    values,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors,
  } = useFormik({
    initialValues: initialFormData,
    enableReinitialize: true,
    validate,
    validateOnBlur,
    validateOnChange,
    onSubmit,
  });

  useEffect(() => {
    if (fetchError) {
      enqueueSnackbar(fetchErrorMessage, {
        variant: "error",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus]);

  useEffect(() => {
    if (saveStatus) {
      setShouldSave(false);

      if (saveError) {
        enqueueSnackbar(errorMessage, {
          variant: "error",
        });

        if (saveStatus === HttpStatus.BadRequest) {
          setErrors(saveError);

          if (submitCallback) {
            submitCallback(saveStatus, saveError);
          }
        }
        setSubmitting(false);
      } else if (saveStatus === HttpStatus.Success || saveStatus === HttpStatus.Created) {
        enqueueSnackbar(successMessage, {
          variant: "success",
        });

        if (submitCallback) {
          submitCallback(saveStatus, saveData);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveStatus]);

  const formikOptions = {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
  };

  return (
    <>
      {isLoading && <LoadingOverlayComponent />}
      {
        title && (
          <StyledFormHeader>
            <TitleComponent title={title} titleTooltip={titleTooltip} />
          </StyledFormHeader>
        )
      }
      <form onSubmit={handleSubmit}>
        <StyledFormBody>
          {
            Children.map(children, child => connectToFormik(child, formikOptions))
          }
          {showDivider && Boolean(actions.length) && <Divider />}
          <StyledFormFooter
            className={
              classNames({
                formFooterFlex: actionsPosition.direction === "row",
                formFooterGrid: actionsPosition.direction === "column",
              })
            }
            {...actionsPosition}
          >
            {
              actions.map(({
                title: actionTitle, component, type, ...actionProps
              }) => {
                const isLink = component === "a" || component?.displayName === "Link";

                return (
                  <StyledLoadingButton
                    key={actionTitle}
                    component={component}
                    type={type}
                    variant="contained"
                    loading={type === "submit" && isSubmitting}
                    disabled={!isLink && isSubmitting}
                    align={actionsPosition.align}
                    {...actionProps}
                  >
                    {actionTitle}
                  </StyledLoadingButton>
                );
              })
            }
          </StyledFormFooter>
        </StyledFormBody>
      </form>
    </>
  );
};

export default FormComponent;

FormComponent.defaultProps = {
  resourceId: null,
  queryParams: {},
  title: "",
  titleTooltip: "",
  children: [],
  validationSchema: {},
  validateOnBlur: true,
  validateOnChange: true,
  showDivider: false,
  initialValues: {},
  actions: [],
  actionsPosition: {
    direction: "row",
    align: "flex-start",
    columns: 1,
    rows: 1,
  },
  beforeSubmitCallback: () => {},
  submitCallback: () => {},
  successMessage: "Success!",
  errorMessage: "Error!",
  fetchErrorMessage: "Fetching error",
};

FormComponent.propTypes = {
  resourceUrl: PropTypes.string.isRequired,
  resourceId: PropTypes.number,
  queryParams: PropTypes.shape({}),
  title: PropTypes.string,
  titleTooltip: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  validationSchema: PropTypes.shape({}),
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
  showDivider: PropTypes.bool,
  initialValues: PropTypes.shape({}),
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    type: PropTypes.oneOf(["button", "submit"]),
  })),
  actionsPosition: PropTypes.shape({
    direction: PropTypes.oneOf(["row", "column"]),
    align: PropTypes.oneOf(["flex-start", "center", "justify", "flex-end"]),
    columns: PropTypes.number,
    rows: PropTypes.number,
  }),
  beforeSubmitCallback: PropTypes.func,
  submitCallback: PropTypes.func,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  fetchErrorMessage: PropTypes.string,
};
