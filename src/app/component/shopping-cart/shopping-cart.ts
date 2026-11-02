import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CartService } from "../../services/cart.service";

@Component({
  imports: [RouterLink],
  selector: "app-shopping-cart",
  styleUrl: "./shopping-cart.css",
  templateUrl: "./shopping-cart.html",
})
export class ShoppingCart {
  protected readonly cart = inject(CartService);
}
