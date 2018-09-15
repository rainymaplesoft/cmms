import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToggleComponent],
  exports: [ToggleComponent]
})
export class AnimationModule { }
