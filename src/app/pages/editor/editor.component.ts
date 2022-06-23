import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  checked: boolean = false;
  loading = false;
  wordsInfo: any = {};
  tempHolder: any;

  editorForm: FormGroup | undefined;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '300px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '640px',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastrService: ToastrMessagesService
  ) {}
  checkText() {
    const el = document.getElementById('bla');
    if (el && el.innerText && this.editorForm) {
      if (
        this.editorForm.value.barbarisms ||
        this.editorForm.value.morphology
      ) {
        if (
          this.editorForm.value.barbarisms &&
          this.editorForm.value.morphology
        ) {
          this.loading = true;
          this.http
            .post('https://localhost:44371/api/Barbarism/FindBarbarisms', {
              Text: el?.innerHTML,
            })
            .subscribe({
              next: (res: any) => {
                this.wordsInfo = Object.keys(res.occurrences);
                this.tempHolder = res.textDTO.Text
              },
              complete: () => {
                this.http
                  .post(
                    'https://localhost:44371/api/Morphology/FindMorphologies',
                    {
                      Text: this.tempHolder,
                    }
                  )
                  .subscribe((res: any) => {
                    this.wordsInfo = [...this.wordsInfo, Object.keys(res.occurrences)];
                    el.innerHTML = res.textDTO.Text;
                    this.loading = false;
                    this.checked = true;
                  });
              },
              error: (error) => {
                this.toastrService.showErrorMessage(`${error}`);
              },
            });
        } else if (
          this.editorForm.value.barbarisms &&
          !this.editorForm.value.morphology
        ) {
          this.loading = true;
          this.http
            .post('https://localhost:44371/api/Barbarism/FindBarbarisms', {
              Text: el?.innerHTML,
            })
            .subscribe((res: any) => {
              this.wordsInfo = Object.keys(res.occurrences);
              el.innerHTML = res.textDTO.Text;
              this.loading = false;
              this.checked = true;
            });
        } else if (
          this.editorForm.value.morphology &&
          !this.editorForm.value.barbarisms
        ) {
          this.loading = true;
          this.http
            .post('https://localhost:44371/api/Morphology/FindMorphologies', {
              Text: el?.innerHTML,
            })
            .subscribe((res: any) => {
              this.wordsInfo = Object.keys(res.occurrences);
              el.innerHTML = res.textDTO.Text;
              this.loading = false;
              this.checked = true;
            });
        }
      } else {
        this.toastrService.showErrorMessage(
          'გთხოვთ მონიშნეთ სასურველი პარამეტრები.'
        );
      }
    } else {
      this.toastrService.showErrorMessage('ტექსტის ველი ცარიელია...');
    }
  }
  ngOnInit() {
    this._initEditorForm();
  }
  private _initEditorForm() {
    this.editorForm = this.fb.group({
      barbarisms: [true, Validators.required],
      morphology: [true, Validators.required],
    });
  }
}
