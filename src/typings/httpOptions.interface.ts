export interface IHttpOptions {
  offset?: number; // pagination start
  limit?: number; // number of items

  [name: string]: any;
}
