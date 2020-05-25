import { PipeTransform, Pipe } from '@angular/core';
import { Photo } from '../photo/photo';

@Pipe({ name: 'filterByDescription' })
export class FilterByDescription implements PipeTransform {

    transform(photos: Photo[], query: string) {
        query = query.trim().toLowerCase();

        if (query) {
            return photos.filter(photo => photo.description.toLowerCase().includes(query));
        } else {
            return photos;
        }
    }

}