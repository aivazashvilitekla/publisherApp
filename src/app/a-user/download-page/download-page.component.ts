import { Component, OnInit } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.scss']
})
export class DownloadPageComponent implements OnInit {
  faDownload = faDownload

  constructor() { }

  ngOnInit() {
  }
  downloadFile(){
    let link = document.createElement("a");
    link.download = "Geohyp.exe";
    link.href = "./GEOHypSetup1.02.exe";
    link.click();
  }
}
