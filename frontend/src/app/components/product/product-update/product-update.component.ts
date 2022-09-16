import { Product } from './../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit{

  product: Product = {
    name: '',
    price: null
  }

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  // Fill up the data when initializing.
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  updateProduct(): void {
    if (!this.productService.isProductFieldsValidateBeforeSubmitData(this.product)){
      this.productService.showMessage("Please fill all the product data before submiting it...");
      return;
    }

    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Product updated successfully!");
      this.router.navigate(['/products']);
    })
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
