import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Navbar } from "./component/navbar/navbar";
import { Footer } from "./component/footer/footer";
import { Toast } from "./component/toast/toast";
import { BackToTop } from "./back-to-top/back-to-top";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Navbar, Footer, Toast, BackToTop],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("storeManager");
}
