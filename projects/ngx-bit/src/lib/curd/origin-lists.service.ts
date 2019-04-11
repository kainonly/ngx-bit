import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../base/http.service';

@Injectable()
export class OriginListsService {
  private action = '/originLists';

  constructor(private http: HttpService) {
  }

  customAction(name: string) {
    this.action = name;
  }

  factory(model: string, condition: any[] = [], like: any = [], or?: any[]): Observable<any> {
    const body = {
      where: condition,
      like: like
    };

    if (or) {
      body['or'] = or;
    }

    return this.http.req(model + this.action, body);
  }
}
