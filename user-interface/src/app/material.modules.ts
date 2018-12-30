import {NgModule} from '@angular/core';
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
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
];

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES,
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    ]
})
export class MaterialModule {
}