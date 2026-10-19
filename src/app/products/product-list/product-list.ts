import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService} from '../productservice';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Review {
  _id: string;
  user: {
    name: string;
  };
  rating: number;
  review: string;
}

export interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  reviews: Review[];

}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface ProductResponse {
  results: number;
  metadata: Metadata;
  data: Product[];
}

@Component({
  imports: [RouterLink],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  
  
  constructor(private productService:ProductService,private cdr:ChangeDetectorRef){
    
  }

  addToCart(product:Product){
    this.productService.addToCart(product);
  }
  productlist?:Product[]


connectToApi(){
  console.log("Starting API request...");
  this.productService.getProducts().subscribe({
    
    next:(result)=>{
      this.productlist=result.data
      console.log(this.productlist);
      this.cdr.detectChanges();
      
    },
    error:(error)=>{
      console.log(error);
      console.log("error in the api");
      
      
    },

    complete:()=>{
      console.log("succesfully connected to the api");
      
    }
  })
}

ngOnInit(){
 this.connectToApi()

}


}
