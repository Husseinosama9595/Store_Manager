import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from './product-list/product-list';
import { Product } from './product-list/product-list';
interface ProductDetailsResponse {
  data: Product;
}
export interface CartItem {
  product: Product;
  quantity: number;
}



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  
  getProducts() {
    return this.http.get<ProductResponse>(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }

getProductById(id: string) {
  return this.http.get<ProductDetailsResponse>(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
}
  cart: CartItem[] = [];

  addToCart(product: Product) {
    const existing = this.cart.find(item => item.product._id === product._id);

    if (existing) {
      if (existing.quantity < product.quantity) {
        existing.quantity++;
      }
    } else {
      this.cart.push({ product: product, quantity: 1 });
    }
    console.log("cart :", this.cart);
  }

  removeFromCart(id: string) {
    this.cart = this.cart.filter(item => item.product._id !== id);
  }

  changeQuantity(id: string, change: number) {
    const item = this.cart.find(i => i.product._id === id);
    if (!item) return;

    const newQuantity = item.quantity + change;

    if (newQuantity < 1) {
      this.removeFromCart(id);
      return;
    }
    if (newQuantity > item.product.quantity) return;

    item.quantity = newQuantity;
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
  }



}