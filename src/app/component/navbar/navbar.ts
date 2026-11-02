import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CartService } from "../../services/cart.service";
import { ThemeService } from "../../services/theme.service";
import { ProductService } from "../../products/productservice";

@Component({
  imports: [RouterLink],
  selector: "app-navbar",
  styleUrl: "./navbar.css",
  templateUrl: "./navbar.html",
})
export class Navbar {
  protected readonly cart = inject(CartService);
  protected readonly theme = inject(ThemeService);
  protected readonly categories = signal<string[]>([]);
  private readonly products = inject(ProductService);

  ngOnInit() {
    this.products.getProducts().subscribe({
      next: (result) => {
        const names = (result.data ?? [])
          .map((product) => product.category?.name)
          .filter((name): name is string => Boolean(name));
        this.categories.set(
          [...new Set(names)].sort((a, b) => a.localeCompare(b)),
        );
      },
      error: (error) =>
        console.error("Could not load navigation categories", error),
    });
  }
}
