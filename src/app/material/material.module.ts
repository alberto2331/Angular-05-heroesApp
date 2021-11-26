import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
//Autocomplete
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//Select
import { MatSelectModule } from '@angular/material/select';
//SnackBar
import { MatSnackBarModule } from '@angular/material/snack-bar';
//MatDialog
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  exports: [     
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    //Autocomplete
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    //Select
    MatSelectModule,
    //SnackBar
    MatSnackBarModule,
    //MatDialog
    MatDialogModule
  ]
})
export class MaterialModule { }
