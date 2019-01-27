// modules
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// services
import { authenticationService } from "./authentication.service";

// types
import { IHttpOptions } from "@typings/httpOptions.interface";

export class HttpService {
  private interface: AxiosInstance;

  constructor() {
    this.interface = axios.create();
    this.interface.interceptors.response.use(
      response => response,
      error => {
        if (
          [401].indexOf(
            error.response &&
              error.response.data &&
              error.response.data.statusCode
          ) !== -1
        ) {
          // unauthorized
        }
        if (error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error(error);
        }
      }
    );
  }

  /**
   * Executes an http request
   * @param method
   * @param query
   * @param data
   */
  private async send<Model>(
    method: string,
    query: string,
    data = {},
    options: IHttpOptions = {}
  ): Promise<Model> {
    query += this.convertOptions(options);

    const response = await this.interface({
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authenticationService.getSessionToken() || { token: "" }
      },
      timeout: 60000,
      method: method,
      url: query,
      data: data,
      baseURL: process.env.API_URL
    } as AxiosRequestConfig);

    if (process.env.NODE_ENV === "DEV") {
      // console.log(query);
      // console.table(response.data);
    }

    return response.data;
  }

  /**
   * Executes a GET request
   * @param query
   */
  protected getRequest<Model>(
    query: string,
    options: IHttpOptions = {}
  ): Promise<Model> {
    return this.send<Model>("GET", query, null, options);
  }

  /**
   * Executes a POST request
   * @param query
   * @param body
   */
  protected postRequest<Model>(
    query: string,
    body: any,
    options: IHttpOptions = {}
  ): Promise<Model> {
    return this.send<Model>("POST", query, body, options);
  }

  /**
   * Executes a PUT request
   * @param query
   * @param body
   */
  protected putRequest<Model>(
    query: string,
    body: any,
    options: IHttpOptions = {}
  ): Promise<Model> {
    return this.send<Model>("PUT", query, body, options);
  }

  /**
   * Executes a DELETE request
   * @param query
   */
  protected deleteRequest<Model>(
    query: string,
    options: IHttpOptions = {}
  ): Promise<Model> {
    return this.send<Model>("DELETE", query, null, options);
  }

  /**
   * Convert options to query params
   * @param options
   */
  private convertOptions(options: IHttpOptions) {
    const params = [];
    for (const option of Object.keys(options)) {
      params.push(
        [
          option,
          Array.isArray(options[option])
            ? options[option].join(",")
            : options[option]
        ].join("=")
      );
    }

    return params.length ? `?${params.join("&")}` : "";
  }
}
