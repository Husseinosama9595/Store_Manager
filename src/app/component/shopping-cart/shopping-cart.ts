import { ChangeDetectorRef, Component } from '@angular/core';
import { CartItem, ProductService } from '../../products/productservice';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-shopping-cart',
  styleUrl: './shopping-cart.css',
  templateUrl: './shopping-cart.html',
})
export class ShoppingCart {

  constructor(private productService:ProductService,private cdr:ChangeDetectorRef){
    
  }

  cartItems: CartItem[] = [];
  total = 0;

  loadCart() {
    this.cartItems = this.productService.cart;
    this.total = this.productService.getCartTotal();
  }

  changeQuantity(id: string, change: number) {
    this.productService.changeQuantity(id, change);
    this.loadCart();
  }

  removeItem(id: string) {
    this.productService.removeFromCart(id);
    this.loadCart();
  }

  clearCart() {
    this.productService.clearCart();
    this.loadCart();
  }

  ngOnInit() {
    this.loadCart();
  }


}
