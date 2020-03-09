import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterpopoverComponent } from './counterpopover/counterpopover.component';



@NgModule({
  declarations: [CounterpopoverComponent],
  exports: [CounterpopoverComponent],
  imports: [
    CommonModule
  ]
})
export class GenericmodalsModule { }
