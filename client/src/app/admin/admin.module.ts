import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IncidenciasComponent } from './incidencias/incidencias.component';
import { IncidenciaDetalleComponent } from '../menu/incidencia-detalle/incidencia-detalle.component';

@NgModule({
  declarations: [
    //IncidenciasComponent,
    //IncidenciaDetalleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AdminModule { }
