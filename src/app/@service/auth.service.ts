import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../@model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value ? new User(this.currentUserSubject.value) : null;
  }

  public get isLogged(): boolean {
    return this.currentUserValue !== null;
  }

  singUp(model: { email: string, password: string }) {
    return this.http.post(`${environment.webApi}/api/singup`, model);
  }

  singIn(model: { email: string, password: string }) {
    return this.http.post<User>(`${environment.webApi}/api/singin`, model)
      .pipe(
        map((user) => {
          this.setLocalUserProfile(user);
          this.currentUserSubject.next(user);
        })
      );
  }



  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['singin']);
 }


  setLocalUserProfile(value) {
    localStorage.setItem('user', JSON.stringify(value));
  }


}
