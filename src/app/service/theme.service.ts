import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllTheme(): Observable<Theme[]> {
    return this.http.get<Theme[]>(
      'https://pgt-api.herokuapp.com/temas',
      this.token
    );
  }

  getByIdTheme(id: number): Observable<Theme> {
    return this.http.get<Theme>(
      `https://pgt-api.herokuapp.com/temas/${id}`,
      this.token
    );
  }

  postTheme(theme: Theme): Observable<Theme> {
    return this.http.post<Theme>(
      'https://pgt-api.herokuapp.com/temas',
      theme,
      this.token
    );
  }

  putTheme(theme: Theme): Observable<Theme> {
    return this.http.put<Theme>(
      'https://pgt-api.herokuapp.com/temas',
      theme,
      this.token
    );
  }

  deleteTheme(id: number) {
    return this.http.delete(
      `https://pgt-api.herokuapp.com/temas/${id}`,
      this.token
    );
  }
}
