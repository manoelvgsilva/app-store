import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ProductListComponent } from "./product-list/product-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RegisterComponent, LoginComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Minatto-Supermercado';
}
