import {Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpService} from '../base/http.service';
import {BitService} from '../base/bit.service';

@Injectable()
export class ListsService {
  private action = '/lists';

  constructor(private http: HttpService, private bit: BitService) {
  }

  customAction(name: string) {
    this.action = name;
  }

  factory(model: string, condition: any[] = [], like: any = [], refresh?: boolean, or?: any[]): Observable<any> {
    if (refresh) {
      this.bit.lists_page_index = 1;
    }

    const body = {
      page: {
        limit: this.bit.page_limit,
        index: this.bit.lists_page_index
      },
      where: condition.map(v => {
        v[2] = v[2].trim();
        return v;
      }),
      like: like.map(v => {
        v.value = v.value.trim();
        return v;
      })
    };

    if (or) {
      body['or'] = or;
    }

    return this.http
      .req(model + this.action, body)
      .pipe(
        switchMap((res) => res.error === 1 && res.msg === 'fail:page_max' ?
          this.factory(model, condition, like, true) : of(res)
        ),
        map((res: any) => {
          if (!res.error) {
            this.bit.lists_totals = res.data.total;
          } else {
            this.bit.lists_totals = 0;
          }
          this.bit.lists_loading = false;
          this.bit.lists_all_checked = false;
          this.bit.lists_indeterminate = false;
          this.bit.lists_disabled_action = true;
          this.bit.lists_checked_number = 0;
          return res;
        })
      );
  }
}
