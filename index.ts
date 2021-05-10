import { of } from 'rxjs';
import { Observable } from 'rxjs/dist/types';
import { map } from 'rxjs/operators';

const ob = new Observable(observer => {
  observer.next('Hello');
});

ob.subscribe(console.log);
