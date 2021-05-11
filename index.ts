import { Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { http } from './http';

console.clear();
const vdomChanged$ = new Subject();

vdomChanged$
  .pipe(
    filter(vdom => vdom !== 'root'),
    switchMap(vdom => http.get(vdom))
  )
  .subscribe(console.log);

vdomChanged$.next('root');
vdomChanged$.next('vdom1');
