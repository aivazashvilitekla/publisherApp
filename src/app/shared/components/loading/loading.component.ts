import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  get loading$() {
    return this.loadingService.loading$;
  }

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {}

}
