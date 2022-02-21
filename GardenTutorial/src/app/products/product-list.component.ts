import {Component, OnInit, OnDestroy} from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ["./product-list.component.css"]
})

export class ProductListComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Product List'
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    // ! at the end of the variable tells type script we will define its type at a later time (not on initiation)
    sub!: Subscription;
    
   
    //private variable to hold the back end value
    private _listFilter: string = '';

    //when the list filter is updated in the text input via ngModule in the template
    //it calls this setter and sets the private back end variable of _listFilter
    //to be the new value the user has input
    //this happens any time the value changes
    set listFilter(value: string){
        this._listFilter = value;
        console.log('In setter:', value)
        //every time the value is updated, excecute the performFilter function
        //with the listFilter passed through as the value
        this.filteredProducts = this.performFilter(value);
    }

    //getter just returns the current value of the back end variable _listFilter
    get listFilter(): string {
        return this._listFilter;
    }
    
    // filteredProducts to hold the array of products once it has been filtered
    //products to hold the array of products when it first arrives from the service via subscribing
    filteredProducts: IProduct[] = [];
    products: IProduct[] = []

    //calling a constructor to use the external Product service in this component
    //setting it to a private variable of productService
    constructor(private productService: ProductService){
    
    }

    ngOnInit(): void{
   
        //on initiate of this component, subscripe to the getProducts observable
        //set it to the local sub variable so we can unsubscribe in the onDestroy class
      this.sub =  this.productService.getProducts().subscribe({
          //next = on the next data object coming through the subscription
            next: products => {
                //set local array products to the incoming products
                this.products = products;
                //set filteredProducts (what we show in the template) to the whole list of products until it is actually filtered via search term
                this.filteredProducts = this.products;
            },
            //set the local errorMessage variable to the incoming err message
            error: err => this.errorMessage = err
        })
      

    }

    //once this component is destroyed unsubscribe
    ngOnDestroy(): void {
        this.sub.unsubscribe;
    }

    //takes in value of listFilter, naming the variable filterBy, returns an array of products
    performFilter(filterBy: string): IProduct[]{
        //convert to lower case so the search isnt case sensitive
        filterBy = filterBy.toLocaleLowerCase();
        //return the array of products with the filter method called, which filters an IProduct
        return this.products.filter((product: IProduct) =>
        //also converts product name to lower case to match the search
        //if the product name includes the value being passed through the filterByValue
        //then return it
        product.productName.toLocaleLowerCase().includes(filterBy));

        //this is then set as the filtered products array in the setter method
    }


    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    //takes the rating clicked from the output of the star component and ammends it to the end of the page title
    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }

    
}