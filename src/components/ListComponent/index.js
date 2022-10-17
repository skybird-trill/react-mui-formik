import { useEffect } from "react";
import PropTypes from "prop-types";

import { useSnackbar } from "notistack";

import List from "@mui/material/List";

import LoadingOverlayComponent from "../LoadingOverlayComponent";
import TitleComponent from "../TitleComponent";

import useFetchFromApi from "../../hooks/useFetchFromApi";
import ResourceService from "../../utils/resourceService";

import { HttpStatus } from "../../constants/http";

const ListComponent = ({
  resourceUrl,
  title,
  titleTooltip,
  ItemComponent,
  AddItemComponent,
  fetchErrorMessage,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const resourceService = new ResourceService(resourceUrl);

  const {
    isLoading,
    responseData,
    responseError,
    responseStatus,
  } = useFetchFromApi(resourceService);

  useEffect(() => {
    if (responseError) {
      enqueueSnackbar(fetchErrorMessage, {
        variant: "error",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseStatus]);

  return (
    <>
      {isLoading && <LoadingOverlayComponent />}
      {title && <TitleComponent title={title} titleTooltip={titleTooltip} />}
      {responseStatus === HttpStatus.Success && (
        <List>
          {responseData.map(itemData => ItemComponent(itemData))}
          {AddItemComponent()}
        </List>
      )}
    </>
  );
};

export default ListComponent;

ListComponent.defaultProps = {
  title: "",
  titleTooltip: "",
  ItemComponent: () => {},
  AddItemComponent: () => {},
  fetchErrorMessage: "Fetching error",
};

ListComponent.propTypes = {
  resourceUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  titleTooltip: PropTypes.string,
  ItemComponent: PropTypes.elementType,
  AddItemComponent: PropTypes.elementType,
  fetchErrorMessage: PropTypes.string,
};
