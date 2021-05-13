import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

class Http {
  get(vdom: string, data?: any) {
    console.log('request started, vdom:', vdom);
    return of({
      success: true,
      vdom,
      data
    }).pipe(delay(300));
  }
}

export const http = new Http();
