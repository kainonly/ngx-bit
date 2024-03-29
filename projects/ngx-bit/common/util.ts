import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { SearchOption } from '../types';

/**
 * 返回查询数组
 */
export function getQuerySchema(options: SearchOption[]): any[] {
  const schema = [];
  for (const search of options) {
    if (typeof search.value === 'object' && Object.keys(<Record<string, any>>search.value).length === 0) {
      continue;
    }
    if (typeof search.value === 'string') {
      search.value = search.value.trim();
    }
    const exclude = search.exclude ?? ['', 0, null];
    if (!exclude.includes(search.value)) {
      let value = search.value;
      switch (search.op) {
        case 'like':
          value = `%${value}%`;
          break;
      }
      switch (search.format) {
        case 'unixtime':
          if (Array.isArray(value)) {
            value = value.map(v => Math.trunc((<Date>v).getTime() / 1000));
          } else {
            value = Math.trunc((<Date>value).getTime() / 1000);
          }
          break;
      }
      schema.push([search.field, search.op, value]);
    }
  }
  return schema;
}

export function asyncValidator(
  handle: Observable<boolean>,
  field = 'duplicated',
  dueTime = 500
): Observable<Record<string, any> | null> {
  return timer(dueTime).pipe(
    switchMap(() => handle),
    map(result => {
      return !result ? { error: true, [field]: true } : null;
    })
  );
}

export function updateFormGroup(controls: AbstractControl[]) {
  controls.forEach(control => {
    if (control instanceof FormGroup) {
      updateFormGroup(Object.values(control.controls));
    } else {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  });
}

/**
 * 加载脚本
 */
export function loadScript(doc: Document, url: string): Observable<undefined> {
  const script = doc.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  doc.body.appendChild(script);
  return new Observable<undefined>(observer => {
    script.onload = () => {
      observer.next();
      observer.complete();
    };
  });
}
