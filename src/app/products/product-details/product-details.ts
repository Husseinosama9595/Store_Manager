import { ProductService } from './../productservice';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product-list/product-list';

@Component({
  imports: [],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  
  private route=inject(ActivatedRoute);
  private productservice = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

   productId = this.route.snapshot.paramMap.get('id');

   product?:Product

   returnSingleProduct(){
    if(this.productId){
      this.productservice.getProductById(this.productId).subscribe({
        next:(result)=>{
          console.log("product recieved :",result);
          this.product = result.data;
          this.cdr.detectChanges();

          
        },

        error:(error)=>{console.log(error);
        },


        complete:()=>{
          console.log("succesfully retrieved the product by id : ", this.productId);
          
        }


      })
    }
   }

  ngOnInit() {
    this.returnSingleProduct()
    console.log("Product ID:", this.productId);
  }

}
