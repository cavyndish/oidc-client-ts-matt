import { UserManager } from "oidc-client-ts";

export default class AuthService {
  constructor() {
    const settings = {
      authority: "...",
      client_id: "...",
      redirect_uri: "http://localhost:3000/openid/callback",
      client_secret: "...",
      post_logout_redirect_uri: "http://localhost:3000/login"
    };
    this.userManager = new UserManager(settings);
  }

  getUser() {
    return this.userManager.getUser();
  }

  login() {
    return this.userManager.signinRedirect();
  }

  loginCallback() {
    return this.userManager.signinRedirectCallback();
  }

  logout() {
    return this.userManager.signoutRedirect();
  }
}
