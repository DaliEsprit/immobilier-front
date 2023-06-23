import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component'; 
import { TabMenuModule } from 'primeng/tabmenu';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaginatorModule } from 'primeng/paginator';

import { BlockUIModule } from 'primeng/blockui';
import { SharedModule } from 'src/app/shared/shared.module'; 
 
@NgModule({
  declarations: [
    ArticlesComponent,  
  ],
  imports: [
    BlockUIModule,
    PaginatorModule,
    AutoCompleteModule,
    DataViewModule,
    CommonModule,
    ArticlesRoutingModule,
    TabMenuModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticlesModule { }
