import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  getHttp(url, cbSuccessFn, cbFailureFn) {
    return this.http.get(url).subscribe(cbSuccessFn, cbFailureFn);
  }

  postHttp(url, postData, cbSucessFn, cbFailureFn) {
    return this.http.post(url, postData).subscribe(cbSucessFn, cbFailureFn);
  }

  putHttp(url, postData, cbSucessFn, cbFailureFn) {
    return this.http.put(url, postData).subscribe(cbSucessFn, cbFailureFn);
  }
}
