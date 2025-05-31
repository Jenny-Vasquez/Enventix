import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuService } from '../menu.services';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from "../../event-front/components/sidebar/sidebar.component";

@Component({

  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  form!: FormGroup;


  constructor(private fb: FormBuilder, private menuService: MenuService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.menuService.getUser().subscribe({
      next: res => {
        this.form.patchValue({
          name: res.user.name,
          email: res.user.email
        });
      },
      error: err => {
        console.error('Error cargando usuario', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.menuService.updateUser(this.form.value).subscribe({
      next: res => {
        console.log('Usuario actualizado:', res);
        alert('Datos actualizados correctamente');
      },
      error: err => {
        console.error('Error al actualizar usuario:', err);
        alert('Error al actualizar usuario');
      }
    });
  }
}
