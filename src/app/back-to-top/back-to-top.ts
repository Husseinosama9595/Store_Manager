import { Component, HostListener } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-back-to-top',
  styleUrl: './back-to-top.css',
  templateUrl: './back-to-top.html',
})
export class BackToTop {
  isVisible: boolean = false;

  // Listen for window scrolling
  @HostListener('window:scroll', [])
  onWindowScroll(): void {

    this.isVisible = window.scrollY > 400;

  }

  // Scroll smoothly to the top
  scrollToTop(): void {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });



}
}
