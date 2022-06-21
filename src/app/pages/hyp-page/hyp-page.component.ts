import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';
import { ClipboardService } from 'ngx-clipboard';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-hyp-page',
  templateUrl: './hyp-page.component.html',
  styleUrls: ['./hyp-page.component.scss'],
})
export class HypPageComponent implements OnInit {
  faCopy = faCopy;
  loading = false;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrMessagesService,
    private clipboardApi: ClipboardService
  ) {}
  checkText() {
    const el = document.getElementById('hypCont');
    if (el && el.innerText) {
      this.loading = true;
      this.http
        .post('https://localhost:44371/api/HypText', {
          Text: el?.innerText,
        })
        .subscribe((res: any) => {
          el.innerHTML = res.Text;
          this.loading = false;
        });
    } else {
      this.toastrService.showErrorMessage('ტექსტის ველი ცარიელია...');
    }
  }
  copyText() {
    const txt = document.getElementById('hypCont')?.innerText;
    if (txt) {
      this.clipboardApi.copyFromContent(txt);
      this.toastrService.showSuccessMessage('ტექსტი დაკოპირდა...');
      return;
    }
    this.toastrService.showErrorMessage('ტექსტის ველი ცარიელია...');
  }
  onPaste(event: any) {
    const cont = document.getElementById('hypCont');
    if (cont)
      navigator['clipboard'].readText().then((data) => {
        cont.innerText = data;
      });
  }
  ngOnInit() {}
}
