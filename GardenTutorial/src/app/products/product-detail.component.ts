import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  //product is undefined until its retrieved (via the function in ngOnInit)
  product: IProduct | undefined;
  sub!: Subscription;
  errorMessage: string = '';

  //Activated route instance is injected into this class, so it can use the product Id parameter
  //to decide which product to display
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += ` ${id}`;
    //when this component is initialised if there is an id then call the get product method on it
    if (id) {
      this.getProduct(id);
    }
  }

  //getProduct method called in the products service
  //subscribe to data stream and set the local variable of product to the one which is returned from the function
  //the function finds a product that matches the id in its parameters
  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });

  }
  //navigate back to products menu when back button is selected on the product detail screen
  onBack(): void {
    this.router.navigate(['/products']);
  }

}
