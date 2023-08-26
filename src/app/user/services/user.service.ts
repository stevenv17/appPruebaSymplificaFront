import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url_base = 'http://localhost:9090';

  constructor(private http: HttpClient) { }

  private requestOptions(params): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return {headers: headers };
  }


  getListUsers() {
    let options = this.requestOptions(null);
    return this.http.get(this.url_base + '/list-users', options);
  }

  deleteUser(id: number) {
    let options = this.requestOptions(null);
    return this.http.delete(this.url_base + '/delete-user/'+id, options);
  }

  
  newUser(body: Object) {
    let options = this.requestOptions(null);
    return this.http.post(this.url_base + '/new-user', body, options);
  }

}
