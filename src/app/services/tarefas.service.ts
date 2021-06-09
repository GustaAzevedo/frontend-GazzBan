import { catchError, map } from 'rxjs/operators';
import { Tarefa } from './../model/Tarefa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  baseUrl = "http://localhost:3001/tarefas";

  constructor(private http: HttpClient) { }

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.baseUrl).pipe(
      map((obj) => obj),
    )
  }

  inserir(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.baseUrl + '/', tarefa);
  }

  update(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.baseUrl}/${tarefa.id}`, tarefa)
  }

  delete(id: number): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${this.baseUrl}/${id}`);
  }
}
