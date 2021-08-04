import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VaccineApplyService {

    constructor(
        private http: HttpClient
    ) { }
    
    postVaccineIssueQRCode(body) {
        return this.http.post("/api/vaccine/issueQRCode",body , {
            withCredentials: true
        });
    }
}
