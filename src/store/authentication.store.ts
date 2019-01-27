import { observable } from "mobx";

// enums
import { XHRState } from "@enums/XHRState";

class AuthenticationStore {
  @observable public state: XHRState;
  @observable public authenticated: boolean = false;
}

export const authenticationStore = new AuthenticationStore();
