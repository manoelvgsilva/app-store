import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        console.log('Produtos carregados:', this.products);
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });
  }

  selectProduct(id: number) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      this.selectedProduct = product;
      console.log('Produto selecionado:', this.selectedProduct);
    } else {
      console.warn('Produto indisponivel!');
    }
  }

  removeProduct(id: number) {
    this.productService.removeProduct(id).subscribe({
      next: () => {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
          this.products.splice(productIndex, 1);
          console.log(`Produto com ID ${id} removido.`);
        } else {
          console.warn(`Produto com ID ${id} não encontrado na lista.`);
        }
      },
      error: (err) => {
        console.error('Erro ao remover produto:', err);
      }
    });
  }
}