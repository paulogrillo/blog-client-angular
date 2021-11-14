import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };
  constructor(private http: HttpClient, private router: Router) {}

  entrar(userLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(
      `${environment.server}/usuarios/logar`,
      userLogin
    );
  }

  cadastrar(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${environment.server}/usuarios/cadastrar`,
      user
    );
  }

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      `${environment.server}/usuarios`,
      this.token
    );
  }

  getByIdUser(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${environment.server}/usuarios/${id}`,
      this.token
    );
  }

  putUser(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${environment.server}/usuarios`,
      user,
      this.token
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
