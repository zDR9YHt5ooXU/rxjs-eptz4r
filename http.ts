import { Subject } from 'rxjs';

class Http {
  get(vdom: string) {
    const sub = new Subject();
    setTimeout(() => {
      sub.next({
        success: true,
        vdom,
        data: {}
      });
      sub.complete();
    });
    return sub.asObservable();
  }
}

export const http = new Http();
