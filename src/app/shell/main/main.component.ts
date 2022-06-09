import { Component, OnInit } from '@angular/core';
import { faPencil, faWarehouse, faSortAlphaAsc  } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  faPencil = faPencil;
  faWarehouse = faWarehouse
  faSortAlphaAsc = faSortAlphaAsc

  constructor() {}

  ngOnInit() {}
}
