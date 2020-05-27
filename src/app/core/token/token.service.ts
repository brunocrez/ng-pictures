import { Injectable } from '@angular/core';

const SECRET = 'authToken'

@Injectable({ providedIn: 'root' })
export class TokenService {

    hasToken() {
        return !!this.getToken();
    }

    setToken(token) {
        window.localStorage.setItem(SECRET, token)
    }

    getToken() {
        return window.localStorage.getItem(SECRET)
    }

    removeToken() {

    }

}