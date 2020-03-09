import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeechComponent } from './speech/speech.component';
import { VozComponent } from './voz/voz.component';


const routes: Routes = [
  { path: 'index', redirectTo: '', pathMatch: 'full' },
  { path: '', component: VozComponent },
  { path: 'voz', component: VozComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
