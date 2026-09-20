import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from './product-list/product-list';
import { Product } from './product-list/product-list';
interface ProductDetailsResponse {
  data: Product;
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
}