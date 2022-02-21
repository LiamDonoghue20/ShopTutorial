import { Injectable, ɵConsole } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

 //register the service in the root of the application

@Injectable({
  providedIn: 'root'
})

export class ProductService {


  //location of json data of products
  //needs to be added to the angular.json files under 'assets'
    private productUrl = 'api/products/products.json';

    //constructor to use http service on this class
    constructor(private http: HttpClient){

    }

    //return type of observable is an array of IProduct
    getProducts(): Observable<IProduct[]>{
    
      ///use http to get an array of products from the JSON file (products URL) and pipe to use the data
        return this.http.get<IProduct[]>(this.productUrl).pipe(
        //tap to be able to see the data without transforming it, turn it to a string and console log
        //the data is tapped into in the product list component where it is used to populate the list
        tap(data => console.log('All', JSON.stringify(data))),
        //if an error occurs call the handleError function
        catchError(this.handleError)
        );
    }

    //return undefined if no product is mapped
    getProduct(id: number) :Observable<IProduct | undefined>{
      //get the full array of products via the local getProducts method
      return this.getProducts()
      //pipe into the data stream and map a product that matches the input id
      //using .find on the array
             .pipe(
               map((products: IProduct[]) => products.find(product => product.productId == id) )
             );

    }

    private handleError(err: HttpErrorResponse){
      let errorMessage = '';
      //if an error event occurs or not
      if (err.error instanceof ErrorEvent){
        errorMessage = `An error occured: ${err.status}, error message is: ${err.message}`
      } else {
        errorMessage = `Server returned an error code ${err.status}, error message is : ${err.message}`
      }
      console.log(errorMessage)
      return throwError(errorMessage)
    }
}