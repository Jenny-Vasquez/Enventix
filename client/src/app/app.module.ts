import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { EventDesignerComponent } from './event-designer/event-designer.component';

import { GridsterModule } from 'angular-gridster2';

import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    EventDesignerComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    GridsterModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
