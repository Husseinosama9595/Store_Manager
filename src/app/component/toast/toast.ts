import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from '../../services/toast.service';

@Component({
  imports: [],
  selector: 'app-toast',
  styleUrl: './toast.css',
  templateUrl: './toast.html',
})
export class Toast {
  protected readonly toastService = inject(ToastService);

  protected readonly styles: Record<ToastType, string> = {
    success: 'text-bg-success',
    info: 'text-bg-dark',
    warning: 'text-bg-warning',
    danger: 'text-bg-danger',
  };
}
