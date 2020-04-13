import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

import { MultiLanguageComponent } from './multi-language/multi-language.component';

const MAT_MODULES = [
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule
];

@NgModule({
  declarations: [
    MultiLanguageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MAT_MODULES,
    TranslateModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    MAT_MODULES,
    TranslateModule,
    HttpClientModule,
    MultiLanguageComponent
  ]
})
export class SharedModule { }
