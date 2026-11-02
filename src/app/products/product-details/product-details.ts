import { ProductService } from "./../productservice";
import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../product-list/product-list";
import { CartService } from "../../services/cart.service";
@Component({
  imports: [],
  selector: "app-product-details",
  styleUrl: "./product-details.css",
  templateUrl: "./product-details.html",
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private productservice = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private cartService = inject(CartService);

  addToCart(product: Product) {
    this.cartService.add(product);
  }

  productId = this.route.snapshot.paramMap.get("id");

  product?: Product;

  selectedImage = "";

  selectImage(image: string) {
    this.selectedImage = image;
  }

  returnSingleProduct() {
    if (this.productId) {
      this.productservice.getProductById(this.productId).subscribe({
        next: (result) => {
          console.log("product recieved :", result);
          this.product = result.data;
          this.selectedImage = result.data.imageCover;
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.log(error);
        },

        complete: () => {
          console.log(
            "succesfully retrieved the product by id : ",
            this.productId,
          );
        },
      });
    }
  }

  ngOnInit() {
    this.returnSingleProduct();
    console.log("Product ID:", this.productId);
  }
}
