import { DOCUMENT } from "@angular/common";
import { Injectable, inject, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly isDark = signal(false);

  constructor() {
    try {
      this.isDark.set(
        this.document.defaultView?.localStorage.getItem("shawl-wear-theme") ===
          "dark",
      );
    } catch {
      this.isDark.set(false);
    }
    this.applyTheme();
  }

  toggle() {
    this.isDark.update((value) => !value);
    try {
      this.document.defaultView?.localStorage.setItem(
        "shawl-wear-theme",
        this.isDark() ? "dark" : "light",
      );
    } catch {
      // The chosen theme still applies for this session when storage is unavailable.
    }
    this.applyTheme();
  }

  private applyTheme() {
    this.document.body.classList.toggle("theme-dark", this.isDark());
    this.document.documentElement.style.colorScheme = this.isDark()
      ? "dark"
      : "light";
  }
}
