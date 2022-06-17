import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  faPencil,
  faWarehouse,
  faSortAlphaAsc,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  faPencil = faPencil;
  faWarehouse = faWarehouse;
  faSortAlphaAsc = faSortAlphaAsc;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    
  }
}
