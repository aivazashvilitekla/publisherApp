import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';

@Component({
  selector: 'app-hyp-page',
  templateUrl: './hyp-page.component.html',
  styleUrls: ['./hyp-page.component.scss']
})
export class HypPageComponent implements OnInit {

  loading = false;


  constructor(
    private http: HttpClient,
    private toastrService: ToastrMessagesService
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
  ngOnInit() {
  }

}
