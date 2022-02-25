import { Component } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-reactive-form';

  constructor( private dialog: MatDialog){}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }
}
