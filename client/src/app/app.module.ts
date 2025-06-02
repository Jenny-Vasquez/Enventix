import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GridsterModule } from 'angular-gridster2';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { PlanDesignerComponent } from './plan-designer/plan-designer.component';
import { ContactoComponent } from './contacto/contacto.component';
import { IncidenciasComponent } from './admin/incidencias/incidencias.component';
import { IncidenciaDetalleComponent } from './admin/incidencia-detalle/incidencia-detalle.component';

// Rutas
import { routes } from './app.routes';

@NgModule({
  declarations: [
    //AppComponent,
    //PlanDesignerComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,                      
    RouterModule.forRoot(routes),    
    GridsterModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}
