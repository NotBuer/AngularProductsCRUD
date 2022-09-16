import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from './../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {

  }

  createProduct(): void {
    if (!this.productService.isProductFieldsValidateBeforeSubmitData(this.product)){
      this.productService.showMessage("Please fill all the product data before submiting it...");
      return;
    }

    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Product created successfully!");
      this.router.navigate(['/products']);
    });
  }

  checkProductNameChanged(obj: any): void {
    if(obj.target.value == "" || obj.target.value == null){
      obj.target.value = null;
      this.product.name = "";
    }
  }

  checkProductPriceChanged(obj: any): void {
    if(obj.target.value == "" || obj.target.value == null){
      obj.target.value = null;
      this.product.price = null;
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
