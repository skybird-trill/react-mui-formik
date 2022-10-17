import { useState, useEffect } from "react";

import { HttpStatus } from "../constants/http";

/**
 * @param {Object} resourceService
 * @param {Function} resourceService.saveResource(saveData)
 * @param {Object} saveData
 * @param {Boolean} shouldSave
 * @returns {Object} { responseData, responseError, responseStatus }
 * @returns {Object} responseData
 * @returns {Object} responseError
 * @returns {Number} responseStatus
 */
const useSaveToApi = (resourceService, saveData, shouldSave) => {
  const [responseData, setResponseData] = useState({});
  const [responseError, setResponseError] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    const saveResource = async () => {
      setResponseError(null);
      setResponseStatus(null);

      const [error, status, data] = await resourceService.saveResource(saveData);
      const errors = status === HttpStatus.BadRequest ? data : error;

      setResponseError(errors);
      setResponseStatus(status);
      setResponseData(data);
    };

    if (shouldSave && saveData) {
      saveResource();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSave]);

  return {
    responseData,
    responseError,
    responseStatus,
  };
};

export default useSaveToApi;
