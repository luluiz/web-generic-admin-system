import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../material-module';
import { MatIconComponent } from './mat-icon.component';
import { IconsRoutes } from './mat-icon.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(IconsRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MatIconComponent]
})
export class IconsModule {}
