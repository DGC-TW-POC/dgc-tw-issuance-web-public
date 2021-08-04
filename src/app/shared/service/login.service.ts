import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Base64 from 'js-base64';
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private http: HttpClient
    ) { 
    }
    public login(body): Observable<any>  {
        return this.http.post("/api/user/claimToken" , body);
    }

    public verifyIsLoing () {
        return this.http.get("/api/user/verifyIsLogin");
    }
}
