import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  combineLatest,
  concat,
  delay,
  empty,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { data, Steps, WhileWorking, Work } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
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
  whileWorking = WhileWorking;
  whileWorkingVar: WhileWorking = WhileWorking.Cleaning;
  uploadedFile: any;
  filename: string = '';
  fileProcessing = false;
  doneProcessing = false;
  lastSelected!: number;

  optionsForm: FormGroup | undefined;
  parentForm: FormGroup | any;
  showOptionsForm: boolean = false;
  formBody: any;
  firstPage!: string;
  pageCount: any[] = [];
  htmlPages: any;

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
    private toastrService: ToastrMessagesService,
    private loadingService: LoadingService
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

          this.getPages();
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
        formValues.cleanExcessParagraphs ||
        formValues.cleanNewLines ||
        formValues.correctPDashStarts
      ) {
        const apiUrl = `https://localhost:44371/api/CleanDoc/${this.filename}?CleanSpaces=${formValues.cleanSpaces}&CleanExcessParagraphs=${formValues.cleanExcessParagraphs}&CleanNewLines=${formValues.cleanNewLines}&CleanTabs=${formValues.cleanSpaces}&CorrectPDashStarts=${formValues.correctPDashStarts}`;

        this.stepsVar = Steps.Processing;
        this.fileProcessing = true;
        const file$ = this.apiService.cleanDoc(apiUrl);
        file$.subscribe({
          complete: () => {
            this.hypDoc(this.filename);
          },
          error: (error) => {
            this.fileProcessing = false;
            this.toastrService.showErrorMessage(`${error}`);
          },
        });
      } else {
        this.toastrService.showErrorMessage(
          '?????????????????? ????????????????????? ????????????????????? ???????????? ???????????????????????????.'
        );
      }
    } else if (this.parentForm.value.hyp && !this.parentForm.value.cleaning) {
      this.stepsVar = Steps.Processing;
      this.fileProcessing = true;
      const file$ = this.apiService.hypDoc(
        `https://localhost:44371/api/HypDoc/${this.filename}`
      );
      file$.subscribe(
        {
          next: (res: any) => {
            this.filename = res.FileName;
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
      );
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
          const apiUrl = `https://localhost:44371/api/CleanDoc/${this.filename}?CleanSpaces=${formValues.cleanSpaces}&CleanOldHyphenation=${formValues.cleanOldHyphenation}&CleanExcessParagraphs=${formValues.cleanExcessParagraphs}&CleanNewLines=${formValues.cleanNewLines}&CleanTabs=${formValues.cleanTabs}&CorrectPDashStarts=${formValues.correctPDashStarts}`;

          this.stepsVar = Steps.Processing;
          this.fileProcessing = true;
          const file$ = this.apiService.cleanDoc(apiUrl);
          file$.subscribe({
            next: (res: any) => {
              this.filename = res.FileName;
            },
            complete: () => {
              this.fileProcessing = false;
              this.doneProcessing = true;
            },
            error: (error) => {
              this.fileProcessing = false;
              this.toastrService.showErrorMessage(`${error}`);
            },
          });
        } else {
          this.toastrService.showErrorMessage(
            '?????????????????? ????????????????????? ????????????????????? ???????????? ???????????????????????????.'
          );
        }
      }
    } else {
      this.toastrService.showErrorMessage(
        '?????????????????? ????????????????????? ??????????????????????????? ?????????????????????????????????.'
      );
    }
  }
  hypDoc(temp: any) {
    return this.apiService
      .hypDoc(`https://localhost:44371/api/HypDoc/${temp}`)
      .subscribe({
        complete: () => {
          this.fileProcessing = false;
          this.doneProcessing = true;
          this.whileWorkingVar = WhileWorking.Done;
        },
        error: (error) => {
          this.fileProcessing = false;
          this.toastrService.showErrorMessage(`${error}`);
        },
      });
  }
  getPages() {
    this.loadingService.startLoading();
    this.http
      .get(`https://localhost:44371/api/GetDocPages/${this.filename}`)
      .subscribe((res: any) => {
        if (res.PageCount > 8) {
          this.toastrService.showErrorMessage(
            '??????????????????????????? ??????????????????????????? ??????????????????????????? ???????????????????????? ??????????????????????????????. ????????????????????? ???????????? ??????????????????????????? ?????? ???????????????????????? ????????????????????? ??????????????????.'
          );
          this.stepsVar = Steps.Uploading
          this.loadingService.stopLoading();
          return;
        }
        for (let i = 1; i <= res.PageCount; i++) {
          this.pageCount.push(i);
        }
        console.log(this.pageCount);
        this.htmlPages = res.Pages;
        const el = document.getElementById('bla');
        if (el) el.innerHTML = res.Pages['1'];
        this.loadingService.stopLoading();
        
      });
  }
  changePage(ind: any) {
    // const el = document.getElementById('bla');
    // if (el) el.innerHTML = this.htmlPages[ind];
    if (!this.htmlPages[ind]) {
      this.loadingService.startLoading();
      this.http
        .get(`https://localhost:44371/api/GetDocPages/${this.filename}?page=${ind}&clean=true`)
        .subscribe((res: any) => {
          console.log(res);
          this.htmlPages = res.Pages;
          const el = document.getElementById('bla');
          if (el) el.innerHTML = res.Pages[ind];
          this.loadingService.stopLoading();
        });
    } else {
      const el = document.getElementById('bla');
      if (el) el.innerHTML = this.htmlPages[ind];
    }
  }
  save() {
    this.http
      .get(`https://localhost:44371/api/SaveWork/${this.filename}`, {
        responseType: 'arraybuffer',
      })
      .subscribe((data) => this.getZipFile(data));
  }
  saveAsPDF() {
    this.loadingService.startLoading();
    this.http
      .get(`https://localhost:44371/api/SaveWork/${this.filename}?pdf=true`, {
        responseType: 'arraybuffer',
      })
      .subscribe((data) => {
        this.getZipFile(data, 'application/pdf');
        this.loadingService.stopLoading();
      });
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
