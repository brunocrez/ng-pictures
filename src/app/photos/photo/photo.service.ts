import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

import { Photo } from './photo';
import { PhotoComment } from './photo-comment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public API = environment.apiURL;

  constructor(private http: HttpClient) { }

  listFromUser(userName: string) {
    return this.http.get<Photo[]>(`${this.API}/${userName}/photos`);
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString())
    return this.http.get<Photo[]>(`${this.API}/${userName}/photos`, { params });
  }

  upload(description: string, comments: boolean, file: File) {

    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', comments ? 'true' : 'false');;
    formData.append('imageFile', file);

    return this.http.post(`${this.API}/photos/upload`, formData, { observe: 'events', reportProgress: true });
  }

  findPhotoById(photoId: number) {
    return this.http.get<Photo>(`${this.API}/photos/${photoId}`);
  }

  getComments(photoId: number) {
    return this.http.get<PhotoComment[]>(`${this.API}/photos/${photoId}/comments`);
  }

  addComment(photoId: number, commentText: string) {
    return this.http.post<PhotoComment[]>(`${this.API}/photos/${photoId}/comments`, { commentText });
  }

  removePhoto(photoId: number) {
    return this.http.delete(`${this.API}/photos/${photoId}`);
  }

  likePhoto(photoId: number) {
    return this.http.post(`${this.API}/photos/${photoId}/like`, {}, { observe: 'response' })
      .pipe(map(res => true))
      .pipe(catchError(err => {
        return err.status == '304' ? of(false) : throwError(err);
      }))
  }
}
