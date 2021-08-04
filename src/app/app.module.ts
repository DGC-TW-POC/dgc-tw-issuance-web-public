import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import * as $ from "jquery";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaccineApplyComponent } from './vaccine-apply/vaccine-apply.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ChooseVaccinationDoseComponent } from './choose-vaccination-dose/choose-vaccination-dose.component';
import { ShowQrcodeComponent } from './show-qrcode/show-qrcode.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VaccineApplyComponent,
    ProgressBarComponent,
    ChooseVaccinationDoseComponent,
    ShowQrcodeComponent
  ],
  imports: [
    BlockUIModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
