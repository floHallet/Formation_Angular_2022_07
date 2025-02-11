import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Subject } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  add = new Subject<User>(); // new EventEmitter

  constructor(private httpClient: HttpClient) {}

  getAll() {
    // this.httpClient.get('https://jsonplaceholder.typicode.com/users').subscribe(() => {
    //   console.log('réponse reçue');
    // });
    // console.log('requete envoyé');
    return this.httpClient.get<User[]>(
      'https://jsonplaceholder.typicode.com/users',
    );
  }

  getById(id: string | number) {
    const obs$ = this.httpClient.get<User>(
      'https://jsonplaceholder.typicode.com/users/' + id
    );

    if (id === '4') {
      return obs$.pipe(delay(3000));
    }

    return obs$;
  }

  create(user: User) {
    return this.httpClient.post<User>(
      'https://jsonplaceholder.typicode.com/users',
      user
    );
  }
}
