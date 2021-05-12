import { Subject } from 'rxjs';
import { onCancel } from './on-cancel';
class Http {
  get(vdom: string, data?: any) {
    const sub = new Subject();
    console.log('request started, vdom:', vdom);
    setTimeout(() => {
      sub.next({
        success: true,
        vdom,
        data
      });
      sub.complete();
    }, 300);
    return sub.asObservable();
  }
}

export const http = new Http();
