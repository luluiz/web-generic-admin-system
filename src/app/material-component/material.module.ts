
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../demo-material-module';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { ChipsComponent } from './chips/chips.component';
import {
    DialogComponent,
    DialogOverviewExampleDialogComponent
} from './dialog/dialog.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MaterialRoutes } from './material.routing';
import { MenuComponent } from './menu/menu.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { RipplesComponent } from './ripples/ripples.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { SliderComponent } from './slider/slider.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { StepperComponent } from './stepper/stepper.component';
import { TabsComponent } from './tabs/tabs.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TooltipComponent } from './tooltip/tooltip.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MaterialRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CdkTableModule
    ],
    providers: [
    ],
    entryComponents: [DialogOverviewExampleDialogComponent],
    declarations: [
        ButtonsComponent,
        BadgeComponent,
        CardsComponent,
        GridComponent,
        ListsComponent,
        MenuComponent,
        TabsComponent,
        RipplesComponent,
        StepperComponent,
        ExpansionComponent,
        ChipsComponent,
        ToolbarComponent,
        ProgressSnipperComponent,
        ProgressComponent,
        DialogComponent,
        DialogOverviewExampleDialogComponent,
        TooltipComponent,
        SnackbarComponent,
        SliderComponent,
        SlideToggleComponent
    ]
})
export class MaterialComponentsModule { }
