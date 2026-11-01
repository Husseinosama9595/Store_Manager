import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Product } from '../products/product-list/product-list';
import { ToastService } from './toast.service';


export type CartProduct = Pick<Product, '_id' | 'title' | 'imageCover' | 'price' | 'quantity'>;

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

const STORAGE_KEY = 'shawlwear.cart.v1';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly toast = inject(ToastService);

  private readonly _items = signal<CartItem[]>(this.readStorage());

  readonly items = this._items.asReadonly();

  readonly count = computed(() => this._items().reduce((n, i) => n + i.quantity, 0));
  readonly total = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  );

  constructor() {
    effect(() => this.writeStorage(this._items()));
  }

  add(product: Product): void {
    if (product.quantity < 1) {
      this.toast.show('This product is out of stock.', 'warning');
      return;
    }

    const existing = this._items().find((i) => i.product._id === product._id);

    if (existing) {
      if (existing.quantity >= product.quantity) {
        this.toast.show(`Only ${product.quantity} available in stock.`, 'warning');
        return;
      }
      this._items.update((items) =>
        items.map((i) =>
          i === existing ? { product: this.toCartProduct(product), quantity: i.quantity + 1 } : i,
        ),
      );
    } else {
      this._items.update((items) => [
        ...items,
        { product: this.toCartProduct(product), quantity: 1 },
      ]);
    }

    this.toast.show(`"${product.title}" added to your cart.`, 'success');
  }

  remove(id: string): void {
    const item = this._items().find((i) => i.product._id === id);
    if (!item) return;
    this._items.update((items) => items.filter((i) => i.product._id !== id));
    this.toast.show('Item removed from your cart.', 'info');
  }

  changeQuantity(id: string, change: number): void {
    const item = this._items().find((i) => i.product._id === id);
    if (!item) return;

    const newQuantity = item.quantity + change;

    if (newQuantity < 1) {
      this.remove(id);
      return;
    }
    if (newQuantity > item.product.quantity) return;

    this._items.update((items) =>
      items.map((i) => (i === item ? { ...i, quantity: newQuantity } : i)),
    );
  }

  clear(): void {
    this._items.set([]);
  }

  private toCartProduct(p: Product): CartProduct {
    return {
      _id: p._id,
      title: p.title,
      imageCover: p.imageCover,
      price: p.price,
      quantity: p.quantity,
    };
  }


  private readStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter(isCartItem)
        .map((i) => ({ ...i, quantity: Math.min(i.quantity, i.product.quantity) }))
        .filter((i) => i.quantity >= 1);
    } catch {
      return [];
    }
  }

  private writeStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or blocked (private mode): the cart still works for this session.
    }
  }
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false;
  const { product, quantity } = value as Partial<CartItem>;
  return (
    !!product &&
    typeof product._id === 'string' &&
    typeof product.title === 'string' &&
    typeof product.imageCover === 'string' &&
    Number.isFinite(product.price) &&
    Number.isFinite(product.quantity) &&
    Number.isInteger(quantity) &&
    (quantity as number) >= 1
  );
}
