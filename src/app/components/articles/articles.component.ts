import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/teme.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  items!: any[];
  constructor(public themeService: ThemeService) {}
  ngOnInit() {
  } 


}
