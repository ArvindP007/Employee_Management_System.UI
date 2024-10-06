import { Component, EventEmitter, Output } from '@angular/core';
import { ModalData } from '../../models/modal-data';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  @Output() actionConfirmed = new EventEmitter<boolean>();

  data?: ModalData;
  private _actionSubject = new Subject<boolean>();
  public isVisible = false; 
  
  open(data: ModalData): Observable<boolean> {
    this.data = data;
    this.isVisible = true;
    return this._actionSubject.asObservable();
  }

  close(success: boolean) {
    this._actionSubject.next(success);
    this.isVisible = false;  
  }
}