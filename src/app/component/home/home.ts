import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Product } from '../../products/product-list/product-list';
import { ProductService } from '../../products/productservice';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

private productservice=inject(ProductService);
private cdr=inject(ChangeDetectorRef);

product?:Product[]

displayHomeProducts(){
  this.productservice.getProducts().subscribe({
    next:(result)=>{
      this.product=result.data.slice(0,7);
      this.cdr.detectChanges();
    },
    error:(error)=>{
      console.log(error);

    },
    complete:()=>{
      console.log("succesfull api retrieval");
    }
  })
}

ngOnInit(){
  this.displayHomeProducts();

}

}
