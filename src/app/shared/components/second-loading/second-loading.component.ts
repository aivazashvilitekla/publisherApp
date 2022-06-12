import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-second-loading',
  templateUrl: './second-loading.component.html',
  styleUrls: ['./second-loading.component.scss'],
})
export class SecondLoadingComponent implements OnInit {
  get loading$() {
    return this.loadingService.loading$;
  }

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {}
}
