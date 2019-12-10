import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
      HomeComponent,
      MainComponent,
    ],
    imports: [
      CommonModule,
      FormsModule,
      NgbModule,
    ],
    exports: [
      HomeComponent,
      MainComponent,
    ],
    providers: [],
  })
export class QuintosModule {

}
