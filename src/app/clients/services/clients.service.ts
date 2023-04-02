import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private url_base = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  private requestOptions(params): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let paramsIn = new HttpParams().set('value', JSON.stringify(params));
    return {params: paramsIn, headers: headers };
  }


  getAllClients() {
    let options = this.requestOptions(null);
    return this.http.get(this.url_base + '/getAllClients', options);
  }

  getClientsByFilters(params: Object = null) {
    let options = this.requestOptions(params);
    return this.http.get(this.url_base + '/getClientsByFilters', options);
  }

  
  saveClient(body: Object) {
    let options = this.requestOptions(null);
    return this.http.post(this.url_base + '/saveClient', body, options);
  }

}
