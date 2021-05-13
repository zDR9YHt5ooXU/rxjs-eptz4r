import { timer, combineLatest, from, Subject, of, BehaviorSubject } from 'rxjs';
import {
  filter,
  exhaustMap,
  concatMap,
  delay,
  switchMap,
  take,
  startWith,
  tap
} from 'rxjs/operators';
import { http } from './http';
import { onCancel } from './on-cancel';
console.clear();
const vdomChanged$ = new Subject<string>();
// const licensePromise = new Promise(resolve =>
//   setTimeout(() => resolve({ license: 'expired' }), 100)
// );

const reload = new Subject();
const license$ = of({ license: 'expired' }).pipe(delay(100));
combineLatest([vdomChanged$, license$])
  .pipe(
    filter(([vdom]) => vdom !== 'vdom1'),
    // tap(vdom => console.log(vdom)),
    switchMap(([vdom, license]) =>
      reload.pipe(
        startWith(null),
        exhaustMap(() =>
          http
            .get(vdom, license)
            .pipe(
              onCancel(() => console.log('request was cancelled vdom:', vdom))
            )
        )
      )
    )
  )
  .subscribe(console.log);

from(['root', 'vdom1', 'vdom2'])
  .pipe(concatMap(val => of(val).pipe(delay(100))))
  .subscribe(vdomChanged$);

// vdomChanged$.next('root');

// setTimeout(() => {
//   vdomChanged$.next('vdom1');
// }, 100)

// setTimeout(() => {
//   vdomChanged$.next('vdom1');
// }, 200)

// setTimeout(() => {
//   console.log('start reloading');
//   reload.next();
//   reload.next();
// }, 1000);

timer(1000, 2)
  .pipe(
    take(2),
    tap(() => console.log('reload started'))
  )
  .subscribe(reload);
