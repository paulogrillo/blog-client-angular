import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') || ''
    ),
  };

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${environment.server}/feed`, this.token);
  }

  getByIdPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(
      `${environment.server}/feed/${id}`,
      this.token
    );
  }

  getByNomePostagem(titulo: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(
      `${environment.server}/feed/titulo/${titulo}`,
      this.token
    );
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(
      `${environment.server}/feed`,
      postagem,
      this.token
    );
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>(
      `${environment.server}/feed`,
      postagem,
      this.token
    );
  }

  deletePostagem(id: number) {
    return this.http.delete(`${environment.server}/feed/${id}`, this.token);
  }
}
