import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { data, Steps, Work } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  selectedWork: Work | undefined;
  loading = false;
  stepsVar: Steps = Steps.Uploading;
  steps = Steps;
  uploadedFile: any;
  filename: string = '';
  fileProcessing = false;
  doneProcessing = false;
  lastSelected!: number;

  optionsForm: FormGroup | undefined;
  parentForm: FormGroup | any;
  showOptionsForm: boolean = false;
  formBody: any;

  pickWork(fromButton?: number) {
    // TODO change max number
    let randomAuthorId = Math.floor(Math.random() * (3 - 1) + 1);
    if (fromButton) {
      while (this.lastSelected === randomAuthorId) {
        randomAuthorId = Math.floor(Math.random() * (3 - 1) + 1);
      }
    }
    this.lastSelected = randomAuthorId;

    const foundAuthor: any = data.find((item) => item.id === randomAuthorId);
    const randomWorkId = Math.floor(Math.random() * foundAuthor.writing.length);

    const foundWriting: any = foundAuthor.writing[randomWorkId];
    this.selectedWork = {
      ...foundAuthor,
      writing: foundWriting,
    };
  }

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastrService: ToastrMessagesService
  ) {}

  ngOnInit() {
    this.pickWork();
    this._initOptionsForm();
    this._initParentForm();
    this.listeningForm();
    this.dragAreaClass = 'dragarea';
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
  private _initOptionsForm() {
    this.optionsForm = this.fb.group({
      cleanSpaces: [''],
      cleanOldHyphenation: [''],
      cleanExcessParagraphs: [''],
      cleanNewLines: [''],
      cleanTabs: [''],
      correctPDashStarts: [''],
    });
  }
  private _initParentForm() {
    this.parentForm = this.fb.group({
      cleaning: [''],
      hyp: [''],
    });
  }
  error!: string;
  dragAreaClass!: string;
  draggedFiles: any;
  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }

  saveFiles(files: FileList) {
    if (files.length > 1) this.error = 'Only one file at time allow';
    else {
      this.error = '';
      this.draggedFiles = files;

      const file = files[0];
      this.filename = files[0].name;

      const formData = new FormData();

      formData.append('thumbnail', file);
      const upload$ = this.apiService.uploadFile(
        'https://localhost:44371/api/TakeDoc',
        formData
      );

      upload$.subscribe({
        next: (res: any) => {
          this.filename = res.FileName;

          // this.getPages();
        },
        complete: () => {
          this.stepsVar = Steps.Overview;
        },
        error: (error) => {
          this.toastrService.showErrorMessage(`${error}`);
        },
      });
    }
  }
  next() {
    if (this.parentForm.value.hyp && this.parentForm.value.cleaning) {
      const formValues = this.optionsForm?.value;
      if (
        formValues.cleanSpaces ||
        formValues.cleanOldHyphenation ||
        formValues.cleanExcessParagraphs ||
        formValues.cleanNewLines ||
        formValues.cleanTabs ||
        formValues.correctPDashStarts
      ) {
        this.formBody = {
          CleanSpaces: formValues.cleanSpaces,
          CleanOldHyphenation: formValues.cleanOldHyphenation,
          CleanExcessParagraphs: formValues.cleanExcessParagraphs,
          CleanNewLines: formValues.cleanNewLines,
          CleanTabs: formValues.cleanTabs,
          CorrectPDashStarts: formValues.correctPDashStarts,
        };
        this.stepsVar = Steps.Processing;
        this.fileProcessing = true;
        const file$ = this.apiService.cleanDoc(
          `https://localhost:44371/api/CleanDoc/${this.filename}`,
          this.formBody
        );
        file$.subscribe(
          {
            next: (res: any) => {
              this.filename = res.FileName;
              console.log('bla')
    
              // this.getPages();
            },
            complete: () => {
              this.fileProcessing = false;
              this.doneProcessing = true;
            },
            error: (error) => {
              this.fileProcessing = false;
              this.toastrService.showErrorMessage(`${error}`);
            },
          }
        //   (res: any) => {
        //   this.filename = res.FileName;
        //   this.fileProcessing = false;
        //   this.doneProcessing = true;
        // }
        );
      } else {
        this.toastrService.showErrorMessage(
          'გთხოვთ აირჩიეთ მინიმუმ ერთი პარამეტრი.'
        );
      }
    } else if (this.parentForm.value.hyp && !this.parentForm.value.cleaning) {
      this.stepsVar = Steps.Processing;
      this.fileProcessing = true;
      const file$ = this.apiService.hypDoc(
        `https://localhost:44371/api/HypDoc/${this.filename}`
      );
      file$.subscribe((res: any) => {
        this.filename = res.FileName;
        this.fileProcessing = false;
        this.doneProcessing = true;
      });
    } else if (this.parentForm.value.cleaning && !this.parentForm.value.hyp) {
      if (this.optionsForm) {
        const formValues = this.optionsForm.value;
        if (
          formValues.cleanSpaces ||
          formValues.cleanOldHyphenation ||
          formValues.cleanExcessParagraphs ||
          formValues.cleanNewLines ||
          formValues.cleanTabs ||
          formValues.correctPDashStarts
        ) {
          this.formBody = {
            CleanSpaces: formValues.cleanSpaces,
            CleanOldHyphenation: formValues.cleanOldHyphenation,
            CleanExcessParagraphs: formValues.cleanExcessParagraphs,
            CleanNewLines: formValues.cleanNewLines,
            CleanTabs: formValues.cleanTabs,
            CorrectPDashStarts: formValues.correctPDashStarts,
          };
          console.log(this.formBody);
          console.log(this.filename);
          this.stepsVar = Steps.Processing;
          this.fileProcessing = true;
          const file$ = this.apiService.cleanDoc(
            `https://localhost:44371/api/CleanDoc/${this.filename}`,
            {
              "CleanSpaces": true,
              "CleanOldHyphenation": true,
              "CleanExcessParagraphs": true,
              "CleanNewLines": true,
              "CleanTabs": true,
              "CorrectPDashStarts": true
          }
          );
          file$.subscribe({
            next: (res: any) => {
              this.filename = res.FileName;
              console.log('bla')
    
              // this.getPages();
            },
            complete: () => {
              this.fileProcessing = false;
              this.doneProcessing = true;
            },
            error: (error) => {
              this.fileProcessing = false;
              this.toastrService.showErrorMessage(`${error}`);
            },
            // complete: () => {
            //   (res: any) => {
            //     this.filename = res.FileName;
            //     this.fileProcessing = false;
            //     this.doneProcessing = true;
            //   };
            // },
            // error: () => {
            //   (res: any) => {
            //     this.fileProcessing = false;
            //   };
            // },
          });
        } else {
          this.toastrService.showErrorMessage(
            'გთხოვთ აირჩიეთ მინიმუმ ერთი პარამეტრი.'
          );
        }
      }
    } else {
      this.toastrService.showErrorMessage(
        'გთხოვთ აირჩიოთ სასურველი პარამეტრები.'
      );
    }
  }
  getPages() {
    this.http
      .get(`https://localhost:44371/api/GetDocPages/${this.filename}`, {
        responseType: 'arraybuffer',
      })
      .subscribe((data) => this.getZipFile(data, 'application/zip'));
  }
  startProcessing() {
    // localhost:44371/api/HypDoc/{fileName} [GET]
    // localhost:44371/api/CleanDoc/{fileName}
    this.fileProcessing = true;
    const file$ = this.apiService.hypDoc(
      `https://localhost:44371/api/HypDoc/${this.filename}`
    );
    file$.subscribe((res: any) => {
      this.filename = res.FileName;
      this.fileProcessing = false;
      this.doneProcessing = true;
    });
  }
  save() {
    this.http
      .get(`https://localhost:44371/api/SaveWork/${this.filename}`, {
        responseType: 'arraybuffer',
      })
      .subscribe((data) => this.getZipFile(data));
  }
  saveAsPDF() {
    this.http
      .get(`https://localhost:44371/api/SaveWork/${this.filename}?pdf=true`, {
        responseType: 'arraybuffer',
      })
      .subscribe((data) => this.getZipFile(data, 'application/pdf'));
  }
  private getZipFile(data: any, type?: string) {
    const blob = new Blob([data], { type: type ? type : 'application/x-zip' });

    const a: any = document.createElement('a');
    document.body.appendChild(a);

    a.style = 'display: none';
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    if (!type) {
      a.download = `${this.filename}`;
    } else {
      if (type == 'application/pdf') {
        a.download = `${this.filename.split('.')[0]}.pdf`;
      } else {
        a.download = `${this.filename.split('.')[0]}.zip`;
      }
    }
    a.click();
    window.URL.revokeObjectURL(url);
    // const blob = new Blob([data], {
    //   type: 'application/zip'
    // });
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
  }
  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }
}
