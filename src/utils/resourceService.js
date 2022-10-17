import { HttpMethods } from "../constants/http";

/**
 * @param {String} resourceUrl
 * @returns {instanceof ResourceService}
 */
class ResourceService {
  constructor(resourceUrl) {
    this.resourceUrl = resourceUrl;
  }

  async fetchResource(queryString, fetchController) {
    if (this.resourceUrl) {
      try {
        const response = await fetch(`${this.resourceUrl}?${queryString}`, {
          method: HttpMethods.Get,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          redirect: "follow",
          signal: fetchController?.signal,
        });

        return [null, response.status, await response.json()];
      } catch (error) {
        return [error, null, {}];
      }
    } else {
      return [null, null, {}];
    }
  }

  async saveResource(resourceData) {
    if (this.resourceUrl) {
      try {
        const response = await fetch(this.resourceUrl, {
          method: resourceData?.id ? HttpMethods.Put : HttpMethods.Post,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(resourceData),
        });

        return [null, response.status, await response.json()];
      } catch (error) {
        return [error, null, {}];
      }
    } else {
      return [null, null, {}];
    }
  }
}

export default ResourceService;
