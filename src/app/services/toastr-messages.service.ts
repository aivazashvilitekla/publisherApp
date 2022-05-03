import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class ToastrMessagesService {
  constructor(private toastr: ToastrService) { }
  showSuccessMessage(message: string) {
    this.toastr.success(message, `Success!`);
  }
  showErrorMessage(message: string) {
    this.toastr.error(message, `Error!`);
  }
}