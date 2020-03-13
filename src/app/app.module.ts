import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechComponent } from './speech/speech.component';
import { VozComponent } from './voz/voz.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { NestedComponent } from './nested.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SummerComponent } from './summer/summer.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechComponent,
    VozComponent,
    NestedComponent,
    SummerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSummernoteModule,
    KeyboardShortcutsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [SpeechComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
