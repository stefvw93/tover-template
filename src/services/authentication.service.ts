import { IAuthentication } from "@typings/authentication.interface";
import { CrudService } from "./crud.abstract.service";

export const authenticationService = new class AuthenticationService extends CrudService<
  IAuthentication
> {
  public sessionTokenKey = "accessToken";

  constructor() {
    super("authenticate");
  }

  public clearSessionToken(): void {
    localStorage.removeItem(this.sessionTokenKey);
  }

  public getSessionToken(): string {
    return localStorage.getItem(this.sessionTokenKey);
  }
}();
