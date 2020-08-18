import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { MultiRoutes } from './multi-dd.routing';
import { SecondLevelComponent } from './second-level.component';
import { ThirdLevelComponent } from './third-level/third-level.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(MultiRoutes)
  ],
  declarations: [SecondLevelComponent, ThirdLevelComponent]
})
export class MultiModule {}
