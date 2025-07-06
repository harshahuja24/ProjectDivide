import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor() { }


  getAllSprints():Observable<any> {
     return of([]);;
  }
}
