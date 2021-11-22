import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllTheme(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${environment.server}/temas`, this.token);
  }

  getByIdTheme(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${environment.server}/temas/${id}`, this.token);
  }

  postTheme(theme: Tema): Observable<Tema> {
    return this.http.post<Tema>(
      `${environment.server}/temas`,
      theme,
      this.token
    );
  }

  putTheme(theme: Tema): Observable<Tema> {
    return this.http.put<Tema>(
      `${environment.server}/temas`,
      theme,
      this.token
    );
  }

  deleteTheme(id: number) {
    return this.http.delete(`${environment.server}/temas/${id}`, this.token);
  }
}
