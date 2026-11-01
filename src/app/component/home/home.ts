import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../products/product-list/product-list';
import { ProductService } from '../../products/productservice';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private readonly productService = inject(ProductService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly campaigns = [
    {
      eyebrow: 'THE NEW SEASON · 2026',
      title: 'A softer way\nto make a statement.',
      description: 'Considered pieces, beautiful textures, and the little details that make a look your own.',
      image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=2200&q=85',
      label: '01 / NEW SEASON',
    },
    {
      eyebrow: 'MADE FOR EVERYDAY',
      title: 'Find your\neveryday favourite.',
      description: 'A thoughtful edit of pieces made to be reached for again and again.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=85',
      label: '02 / THE EVERYDAY EDIT',
    },
    {
      eyebrow: 'THE FINISHING TOUCH',
      title: 'Small details.\nA whole new feeling.',
      description: 'Discover the finishing touches that bring your personal style together.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=85',
      label: '03 / STYLE NOTES',
    },
  ];

  activeCampaign = 0;
  products: Product[] = [];

  get campaign() {
    return this.campaigns[this.activeCampaign];
  }

  showCampaign(index: number) {
    this.activeCampaign = (index + this.campaigns.length) % this.campaigns.length;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (result) => {
        this.products = result.data.slice(0, 4);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Could not load featured products', error),
    });
  }
}
