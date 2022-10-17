import { useState, useEffect, useMemo } from "react";

import { buildQueryString } from "../utils/queryString";

/**
 * @param {Object} resourceService
 * @param {Function} resourceService.fetchResource(queryString, fetchController)
 * @param {Object} queryParams
 * @param {Boolean} shouldRefetch
 * @param {Boolean} omitFetch
 * @returns {Object} { isLoading, responseData, responseError, responseStatus }
 * @returns {Boolean} isLoading
 * @returns {Object} responseData
 * @returns {Object} responseError
 * @returns {Number} responseStatus
 */
const useFetchFromApi = (resourceService, queryParams, shouldRefetch, omitFetch) => {
  const [responseData, setResponseData] = useState({});
  const [responseError, setResponseError] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(!omitFetch);

  const cachedQueryString = useMemo(() => buildQueryString(queryParams), [queryParams]);

  useEffect(() => {
    const fetchController = new AbortController();

    const fetchResource = async () => {
      setIsLoading(true);

      const [error, status, data] = await resourceService.fetchResource(cachedQueryString, fetchController);

      setResponseError(error);
      setResponseStatus(status);
      setResponseData(data);
      setIsLoading(false);
    };

    if (!omitFetch && fetchController && !fetchController.signal.aborted) {
      fetchResource();
    }

    return () => {
      fetchController.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedQueryString, shouldRefetch]);

  return {
    isLoading,
    responseData,
    responseError,
    responseStatus,
  };
};

export default useFetchFromApi;
