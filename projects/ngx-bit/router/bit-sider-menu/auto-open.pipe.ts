import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'AutoOpen' })
export class AutoOpenPipe implements PipeTransform {
  transform(fragments: string[], actived: string[]): boolean {
    const len = fragments.length;
    for (let i = 0; i < len; i++) {
      if (fragments[i] !== actived[i]) {
        return false;
      }
    }
    return true;
  }
}
