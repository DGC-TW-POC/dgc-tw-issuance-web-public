import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import { Observable } from 'rxjs';
import { VaccineData } from '../shared/models/vaccine-data';

@Injectable({
  providedIn: 'root'
})
export class ChooseVaccinationDoseService {

  constructor(
              private http: HttpClient
  ) { }

  getVaccineCDCData(params): Observable<any> {
    //https://stackoverflow.com/a/45725439
    let query = Base64.encode(JSON.stringify(params) , true);
    let p = new HttpParams();
    p = p.set("qs",  query);
    return this.http.get<Array<VaccineData.ISearchResult>>('/api/vaccine/CDCData' , {
      params : p ,
      withCredentials : true
    });
  }
}
