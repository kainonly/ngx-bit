import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BitI18nSwitchComponent} from './component/bit-i18n-switch/bit-i18n-switch.component';
import {BitI18nTipsComponent} from './component/bit-i18n-tips/bit-i18n-tips.component';

@NgModule({
  exports: [
    BitI18nSwitchComponent,
    BitI18nTipsComponent
  ],
  declarations: [
    BitI18nSwitchComponent,
    BitI18nTipsComponent
  ],
  imports: [NgZorroAntdModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxBitExtModule {
}