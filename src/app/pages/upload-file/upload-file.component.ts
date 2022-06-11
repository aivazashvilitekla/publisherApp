import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { data, Steps, Work } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  selectedWork: Work | undefined;
  loading = false;
  stepsVar: Steps = Steps.Overview;
  steps = Steps;
  uploadedFile: any;
  filename: string = '';
  fileProcessing = false;
  doneProcessing = false;

  
  pickWork() {
    // TODO change max number
    const randomAuthorId = Math.floor(Math.random() * (3 - 1) + 1);

    // const randomAuthorId = 1;
    // const randomWorkId = 101;
    const foundAuthor: any = data.find((item) => item.id === randomAuthorId);
    const randomWorkId = Math.floor(Math.random() * foundAuthor.writing.length);
    console.log(randomWorkId);

    const foundWriting: any = foundAuthor.writing[randomWorkId];
    this.selectedWork = {
      ...foundAuthor,
      writing: foundWriting,
    };
  }

  constructor(private apiService: ApiService, private http: HttpClient) {}

  ngOnInit() {
    this.pickWork();
    this.dragAreaClass = 'dragarea';
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

      upload$.subscribe((res) => {
        console.log(res);
        this.stepsVar = Steps.Overview;
        // this.getPages();
      });
      // this.stepsVar = Steps.Overview;
    }
  }
  next() {
    this.stepsVar = Steps.Processing;
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
