import { from, Subject, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

console.clear();
const vdomChanged$ = new Subject<string>();

vdomChanged$.subscribe(console.log);

vdomChanged$.next('root');

setTimeout(() => {
  vdomChanged$.next('vdom1');
}, 100);

// from(['root', 'vdom1', 'vdom2'])
//   .pipe(concatMap(val => of(val).pipe(delay(100))))
//   .subscribe(vdomChanged$);
