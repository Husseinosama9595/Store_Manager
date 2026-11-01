import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { Product } from './products/product-list/product-list';
import { CartService } from './services/cart.service';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the navbar brand', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.navbar-brand')?.textContent).toContain('Shawl Wear');
  });

  it('shows the cart badge and a toast after adding a product', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.badge')).toBeNull();

    TestBed.inject(CartService).add({
      _id: 'p1',
      title: 'Wool Shawl',
      imageCover: 'c.jpg',
      price: 100,
      quantity: 5,
    } as Product);
    await fixture.whenStable();

    expect(el.querySelector('.navbar .badge')?.textContent?.trim()).toBe('1');
    expect(el.querySelector('.toast')?.textContent).toContain('Wool Shawl');
  });
});
