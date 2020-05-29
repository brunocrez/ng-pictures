import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';

const API = 'http://localhost:3000'

@Injectable({ providedIn: 'root' })
export class RegisterService {

    constructor(private http: HttpClient) { }

    checkUserTaken(userName: string) {
        return this.http.get(`${API}/user/exists/${userName}`)
    }

    register(newUser: NewUser) {
        return this.http.post(`${API}/user/signup`, newUser)
    }
}
