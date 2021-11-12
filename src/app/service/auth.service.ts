import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(
      'https://pgt-api.herokuapp.com/usuarios/logar',
      userLogin
    );
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>(
      'https://pgt-api.herokuapp.com/usuarios/cadastrar',
      user
    );
  }

  logado() {
    let ok: boolean = false;

    if (environment.token != '') {
      ok = true;
    }
    if (ok == false) {
      alert('Sua sessão expirou!');
      this.router.navigate(['/entrar']);
    }
    return ok;
  }

  canActivate(): boolean {
    return this.logado();
  }
}
