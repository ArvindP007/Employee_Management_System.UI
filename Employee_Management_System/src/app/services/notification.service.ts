import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  toastrConfig: Partial<IndividualConfig<any>> = {
    timeOut: 5000,
    positionClass: 'toast-top-center'
  }
  constructor(private toastr: ToastrService) { }

  success(message: string) {
    this.toastr.success(message, "", this.toastrConfig)
  }

  error(message: string) {
    this.toastr.error(message, "", this.toastrConfig)
  }

  warning(message: string) {
    this.toastr.warning(message, "", this.toastrConfig)
  }
}
