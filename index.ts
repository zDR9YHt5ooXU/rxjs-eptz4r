import { Subject } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';
import { http } from './http';

console.clear();
const vdomChanged$ = new Subject();

vdomChanged$
  .pipe(
    filter(vdom => vdom !== 'vdom1'),
    tap(vdom => http.get(vdom))
  )
  .subscribe(console.log);

vdomChanged$.next('root');
vdomChanged$.next('vdom1');
