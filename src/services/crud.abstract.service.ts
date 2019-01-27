// services
import { HttpService } from "./http.service";

// types
import { IHttpOptions } from "@typings/httpOptions.interface";

export abstract class CrudService<IModel> extends HttpService {
  constructor(protected readonly controller: string) {
    super();
  }

  /**
   * Fetches a list of all models
   */
  public getAll(options: IHttpOptions = {}): Promise<IModel[]> {
    return this.getRequest<IModel[]>(this.controller, options);
  }

  /**
   * Fetches a specific model by id
   * @param id
   */
  public get(id: string, options: IHttpOptions = {}): Promise<IModel> {
    return this.getRequest<IModel>([this.controller, id].join("/"), options);
  }

  /**
   * Fetches a specific model by id
   * @param id
   */
  public getMany(ids: string[], options: IHttpOptions = {}): Promise<IModel[]> {
    return this.getRequest<IModel[]>(
      [this.controller, "many", ids.join(",")].join("/"),
      options
    );
  }

  /**
   * Creates a new model
   * @param model
   */
  public create(model: IModel, options: IHttpOptions = {}): Promise<IModel> {
    return this.postRequest<IModel>(this.controller, model, options);
  }

  /**
   * Updates a specific model
   * @param model
   */
  public update(model: IModel, options: IHttpOptions = {}): Promise<IModel> {
    return this.putRequest<IModel>(this.controller, model, options);
  }

  /**
   * Deletes a specific model
   * @param id
   */
  public delete(id: string, options: IHttpOptions = {}): Promise<IModel> {
    return this.deleteRequest<IModel>([this.controller, id].join("/"), options);
  }
}
