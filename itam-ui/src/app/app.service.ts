import { Injectable } from '@angular/core';
import { HttpService } from './base/services/http.service';
import { AppConstant } from './app.constant';

@Injectable()
export class AppService {

  AppServiceConst = {
    'getSinglePage': AppConstant.appJsonUrl + 'assets/data/getSinglePage.json',
    'getUserInfo' : AppConstant.itamServiceUrl 
  }

  constructor(private httpService: HttpService) { }

  getSideMenu(successFn, cbFailureFn) {
    this.httpService.getHttp(this.AppServiceConst.getSinglePage, successFn, cbFailureFn);
  }

  getUserInfo(successFn, cbFailureFn){
    this.httpService.getHttp(this.AppServiceConst.getUserInfo, successFn, cbFailureFn);
}

}
