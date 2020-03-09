import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechComponent } from './speech/speech.component';
import { FormsModule } from '@angular/forms';
import { VozComponent } from './voz/voz.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { NestedComponent } from './nested.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechComponent,
    VozComponent,
    NestedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KeyboardShortcutsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [SpeechComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
