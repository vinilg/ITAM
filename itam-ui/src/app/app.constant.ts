import { environment } from '../environments/environment.prod';
export const AppConstant = new function () {
  let envUrl = environment.envUrls;
  //this.appBaseUrl = window.location.origin + "/";
  this.appBaseUrl = "http://localhost:7006/";
  this.appJsonUrl = envUrl.appBase;
  //this.userManagmentUrl = this.appBaseUrl + envUrl.umUrl;
  this.itamServiceUrl = this.appBaseUrl + envUrl.appItam
  this.userManagmentUrl = "https://etac.tatacommunications.com/user-management/";
  }