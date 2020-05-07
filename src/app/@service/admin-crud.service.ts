import { Injectable } from '@angular/core';
import { AdminModule } from '../admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Contact } from '../@model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCrudService {

  constructor(
    private http: HttpClient,
  ) { }


  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.webApi}/api/contact`);
  }
  
  addContact(model:Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.webApi}/api/contact/post`, model);
  }

  editContact(model:Contact): Observable<Contact>{
    return this.http.put<Contact>(`${environment.webApi}/api/contact/update/${model._id}`, model);
  }

  deleteContact(id: string): Observable<{}> {
    return this.http.delete(`${environment.webApi}/api/contact/delete/${id}`)
  }
}
