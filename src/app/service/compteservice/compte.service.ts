import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Compte } from 'src/app/model/Compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private _httpClient: HttpClient) {}

  getAccountsByCin(cin: string): Observable<Compte[]> {
    return this._httpClient.get<Compte[]>(`http://localhost:8080/comptes/${cin}`);
  }

  addAccount(cin: string, solde: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `cin=${cin}&solde=${solde}`;
    return this._httpClient.post<any>(`http://localhost:8080/comptes/`, body, { headers });
  }

  updateAccount(rib: number, updatedCompte:Compte): Observable<any> {
    return this._httpClient.put(`http://localhost:8080/comptes/${rib}`, updatedCompte);
  }
  
  deleteCompte(rib: number): Observable<void> {
    return this._httpClient.delete<void>(`http://localhost:8080/comptes/${rib}`);
  }



}
