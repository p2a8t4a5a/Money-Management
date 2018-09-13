import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule, MatDialogModule, MatSelectModule
} from '@angular/material';

const MATERIAL_MODULES = [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule
];

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES,
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
})
export class MaterialModule { }