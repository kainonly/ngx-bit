import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { BitConfig, UploadOption, UploadSignedResponse } from 'ngx-bit';

@Directive({
  selector: 'nz-upload[bitUpload]'
})
export class BitUploadDirective {
  constructor(config: BitConfig, http: HttpClient, nzUploadComponent: NzUploadComponent) {
    const option = config.upload! as UploadOption;
    nzUploadComponent.nzSize = option.size ?? 5120;
    nzUploadComponent.nzShowUploadList = false;
    nzUploadComponent.nzAction = option.url;
    if (option.storage === 'default') {
      /**
       * 默认上传终止设置
       */
      return;
    }
    nzUploadComponent.nzData = (file: NzUploadFile): Observable<Record<string, any>> => {
      return http
        .request(option.fetchSignedMethod!, option.fetchSigned!, {
          withCredentials: true
        })
        .pipe(
          map(v => {
            const response = v as UploadSignedResponse;
            const sep = file.name.split('.');
            const ext = sep.length > 1 ? `.${sep.pop()?.toLowerCase()}` : '';
            file.key = response.filename + ext;
            switch (option.storage) {
              /**
               * 阿里云对象存储
               */
              case 'oss':
                return {
                  key: file.key,
                  policy: response.option.policy,
                  OSSAccessKeyId: response.option.access_key_id,
                  Signature: response.option.signature
                };
              /**
               * 华为云对象存储
               */
              case 'obs':
                return {
                  key: file.key,
                  policy: response.option.policy,
                  AccessKeyId: response.option.access_key_id,
                  signature: response.option.signature
                };
              /**
               * 腾讯云对象存储
               */
              case 'cos':
                return {
                  key: file.key,
                  policy: response.option.policy,
                  'q-sign-algorithm': response.option.sign_algorithm,
                  'q-ak': response.option.ak,
                  'q-key-time': response.option.key_time,
                  'q-signature': response.option.signature
                };
              default:
                throw new Error('默认上传到后端服务器，无需签名配置');
            }
          })
        );
    };
  }
}
