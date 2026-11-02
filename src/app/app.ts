import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Navbar } from "./component/navbar/navbar";
import { Footer } from "./component/footer/footer";
import { Toast } from "./component/toast/toast";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Navbar, Footer, Toast],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("storeManager");
}
