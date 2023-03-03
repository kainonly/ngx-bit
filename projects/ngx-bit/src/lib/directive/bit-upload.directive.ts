import { Directive } from "@angular/core";
import { NzUploadComponent, UploadFile } from "ng-zorro-antd";
import { ConfigService } from "../common/config.service";
import { BitService } from "../common/bit.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Directive({
  selector: "[bitUpload]"
})
export class BitUploadDirective {
  constructor(bit: BitService, config: ConfigService, http: HttpClient, nzUploadComponent: NzUploadComponent) {
    nzUploadComponent.nzWithCredentials = config.withCredentials;
    nzUploadComponent.nzAction = bit.uploads;
    nzUploadComponent.nzSize = 5120;
    nzUploadComponent.nzShowUploadList = false;

    if (!config.uploadsOption) {
      return;
    }
    const option = config.uploadsOption;
    nzUploadComponent.nzWithCredentials = false;
    nzUploadComponent.nzData = (file: UploadFile): Observable<Record<string, any>> => {
      return http
        .request(option.fetchSignedMethod!, option.fetchSigned!, {
          withCredentials: config.withCredentials
        })
        .pipe(
          map((response: any) => {
            const sep = file.name.split(".");
            const ext = sep.length > 1 ? `.${sep.pop().toLowerCase()}` : "";
            file.key = response.filename + ext;
            switch (option.storage) {
              /**
               * 阿里云对象存储
               */
              case "oss":
                return {
                  key: file.key,
                  policy: response.option.policy,
                  OSSAccessKeyId: response.option.access_key_id,
                  Signature: response.option.signature
                };
              /**
               * 华为云对象存储
               */
              case "obs":
                return {
                  key: file.key,
                  policy: response.option.policy,
                  AccessKeyId: response.option.access_key_id,
                  signature: response.option.signature
                };
              /**
               * 腾讯云对象存储
               */
              case "cos":
                return {
                  key: file.key,
                  policy: response.option.policy,
                  "q-sign-algorithm": response.option.sign_algorithm,
                  "q-ak": response.option.ak,
                  "q-key-time": response.option.key_time,
                  "q-signature": response.option.signature
                };
            }
          })
        );
    };
  }
}
