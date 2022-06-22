import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';
import { ClipboardService } from 'ngx-clipboard';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-hyp-page',
  templateUrl: './hyp-page.component.html',
  styleUrls: ['./hyp-page.component.scss'],
})
export class HypPageComponent implements OnInit {
  faCopy = faCopy;
  loading = false;

  parentForm: FormGroup | any;
  optionsForm: FormGroup | undefined;
  showOptionsForm: boolean = false;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrMessagesService,
    private clipboardApi: ClipboardService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}
  hypText(el: any, txt: any) {
    this.http
      .post('https://localhost:44371/api/HypText', {
        textDTO: {
          Text: txt,
        },
      })
      .subscribe((res: any) => {
        el.innerHTML = res.Text;
        this.loading = false;
      });
  }
  checkText() {
    const el = document.getElementById('hypCont');
    if (el && el.innerText) {
      if (this.parentForm.value.hyp && this.parentForm.value.cleaning) {
        const formValues = this.optionsForm?.value;
        if (
          formValues.cleanSpaces ||
          formValues.cleanExcessParagraphs ||
          formValues.cleanNewLines ||
          formValues.correctPDashStarts
        ) {
          const apiUrl = `https://localhost:44371/api/CleanText`;

          const file$ = this.http.post(apiUrl, {
            textDTO: {
              Text: el.innerText,
            },
            docCleanDTO: {
              CleanSpaces: formValues.cleanSpaces,
              CleanExcessParagraphs: formValues.cleanExcessParagraphs,
              CleanNewLines: formValues.cleanNewLines,
              CleanTabs: formValues.cleanSpaces,
              CorrectPDashStarts: formValues.correctPDashStarts,
            },
          });
          file$.subscribe({
            next: (res: any) => {
              this.loading = true;
              this.http
                .post('https://localhost:44371/api/HypText', {
                  Text: el?.innerText,
                })
                .subscribe((res: any) => {
                  el.innerHTML = res.Text;
                  this.loading = false;
                });
            },
            complete: () => {},
            error: (error) => {
              this.toastrService.showErrorMessage(`${error}`);
            },
          });
        } else {
          this.toastrService.showErrorMessage(
            'გთხოვთ აირჩიეთ მინიმუმ ერთი პარამეტრი.'
          );
        }
      } else if (this.parentForm.value.hyp && !this.parentForm.value.cleaning) {
        this.loading = true;
        this.http
          .post('https://localhost:44371/api/HypText', {
            Text: el?.innerText,
          })
          .subscribe((res: any) => {
            el.innerHTML = res.Text;
            this.loading = false;
          });
      } else if (!this.parentForm.value.hyp && this.parentForm.value.cleaning) {
        const formValues = this.optionsForm?.value;
        if (
          formValues.cleanSpaces ||
          formValues.cleanExcessParagraphs ||
          formValues.cleanNewLines ||
          formValues.correctPDashStarts
        ) {
          const apiUrl = `https://localhost:44371/api/CleanText`;

          const file$ = this.http.post(apiUrl, {
            textDTO: {
              Text: el.innerText,
            },
            docCleanDTO: {
              CleanSpaces: formValues.cleanSpaces,
              CleanExcessParagraphs: formValues.cleanExcessParagraphs,
              CleanNewLines: formValues.cleanNewLines,
              CleanTabs: formValues.cleanSpaces,
              CorrectPDashStarts: formValues.correctPDashStarts,
            },
          });
          this.loading = true;
          file$.subscribe({
            next: (res: any) => {
              el.innerHTML = res.Text;
              this.loading = false;
            },
            error: (error) => {
              this.toastrService.showErrorMessage(`${error}`);
            },
          });
        } else {
          this.toastrService.showErrorMessage(
            'გთხოვთ აირჩიეთ მინიმუმ ერთი პარამეტრი.'
          );
        }
      } else {
        this.toastrService.showErrorMessage(
          'გთხოვთ აირჩიეთ სასურველი პარამეტრები'
        );
      }
    } else {
      this.toastrService.showErrorMessage('ტექსტის ველი ცარიელია...');
    }
  }
  copyText() {
    let txt = document.getElementById('hypCont')?.innerText;
    if (txt) {
      txt = txt.replace(/\xad/gm, String.fromCharCode(31));
      this.clipboardApi.copyFromContent(txt);
      this.toastrService.showSuccessMessage('ტექსტი დაკოპირდა...');
      return;
    }
    this.toastrService.showErrorMessage('ტექსტის ველი ცარიელია...');
  }
  onPaste(event: any) {
    let cont = document.getElementById('hypCont');
    if (cont) {
      navigator['clipboard'].readText().then((data) => {
        if (cont) {
          let find = String.fromCharCode(172); // 3x space
          let regex = new RegExp(find, 'gm');
          let updatedData = data.replace(regex, '\xad');
          cont.innerText = updatedData;
        }
      });
    }
  }
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 67) {
      let txt = document.getElementById('hypCont')?.innerText;
      if (txt) {
        txt = txt.replace(/\xad/gm, String.fromCharCode(31));
        this.clipboardApi.copyFromContent(txt);
      }
    }
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 86) {
      let cont = document.getElementById('hypCont')?.innerText;
      if (cont)
        navigator['clipboard'].readText().then((data) => {
          cont = data.replace(String.fromCharCode(172), '\xad');
        });
    }
  }
  ngOnInit() {
    this._initOptionsForm();
    this._initParentForm();
    this.listeningForm();
  }
  private _initOptionsForm() {
    this.optionsForm = this.fb.group({
      cleanSpaces: [false],
      cleanExcessParagraphs: [false],
      cleanNewLines: [false],
      correctPDashStarts: [false],
    });
  }
  private _initParentForm() {
    this.parentForm = this.fb.group({
      cleaning: [''],
      hyp: [''],
    });
  }
  listeningForm() {
    this.parentForm.valueChanges
      .pipe(
        tap((res: any) => {
          if (res.cleaning) {
            return (this.showOptionsForm = true);
          }
          return (this.showOptionsForm = false);
        })
      )
      .subscribe();
  }
}
