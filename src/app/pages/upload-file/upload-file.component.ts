import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Steps } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
interface Work {
  id: number;
  img: string;
  fullName: string;
  born: string;
  died: string;
  titleName: string;
  writing: Writing;
}
interface Writing {
  id: number;
  title: string;
  year: string;
  text: string;
}
const data = [
  {
    id: 1,
    img: '../../../assets/images/authors/galaktion.jpg',
    fullName: 'გალაკტიონ ტაბიძე',
    born: 'დ. 17 ნოემბერი, 1892',
    died: 'მ. 17 მარტი, 1959',
    titleName: 'პოეტი',
    writing: [
      {
        id: 101,
        title: 'ლურჯა ცხენები',
        year: '1915წ.',
        text: `
        როგორც ნისლის ნამქერი, ჩამავალ მზით ნაფერი,
        ელვარებდა ნაპირი სამუდამო მხარეში!
        არ სჩანდა შენაპირი, ვერ ვნახე ვერაფერი,
        ცივ და მიუსაფარი მდუმარების გარეშე.
        
        მდუმარების გარეშე და სიცივის თარეშში,
        სამუდამო მხარეში მხოლოდ სიმწუხარეა!
        ცეცხლი არ კრთის თვალებში, წევხარ ცივ სამარეში,
        წევხარ ცივ სამარეში და არც სულს უხარია.
        
        შეშლილი სახეების ჩონჩხიანი ტყეებით
        უსულდგმულო დღეები რბიან, მიიჩქარიან!
        სიზმარიან ჩვენებით - ჩემი ლურჯა ცხენებით
        ჩემთან მოესვენებით! ყველანი აქ არიან!
        
        იჩქარიან წამები, მე კი არ მენანება:
        ცრემლით არ ინამება სამუდამო ბალიში;
        გაქრა ვნება-წამება - როგორც ღამის ზმანება,
        ვით სულის ხმოვანება ლოცვის სიმხურვალეში.
        
        ვით ცეცხლის ხეტიალი, როგორც ბედის ტრიალი,
        ჩქარი გრგვინვა-გრიალით ქრიან ლურჯა ცხენები!
        ყვავილნი არ არიან, არც შვება-სიზმარია!
        ეხლა კი სამარეა შენი განსასვენები!
        
        რომელი სცნობს შენს სახეს, ან ვინ იტყვის შენს სახელს?
        ვინ გაიგებს შენს ძახილს, ძახილს ვინ დაიჯერებს?
        ვერავინ განუგეშებს საოცრების უბეში,
        სძინავთ ბნელ ხვეულებში გამოუცნობ ქიმერებს!
        
        მხოლოდ შუქთა კამარა ვერაფერმა დაფარა:
        მშრალ რიცხვების ამარა უდაბნოში ღელდება!
        შეშლილი სახეების ჩონჩხიანი ტყეებით
        უსულდგმულო დღეები ჩნდება და ქვესკნელდება.
        
        მხოლოდ ნისლის თარეშში, სამუდამო მხარეში,
        ზევით თუ სამარეში, წყევლით შენაჩვენები,
        როგორც ზღვის ხეტიალი, როგორც ბედის ტრიალი,
        ჩქარი გრგვინვა-გრიალით ქრიან ლურჯა ცხენები!`,
      },
    ],
  },
];

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

  pickWork() {
    // const randomAuthorId = Math.floor(Math.random() * (100 - 1) + 1);
    // const randomWorkId = Math.floor(Math.random() * (200 - 101) + 101);
    const randomAuthorId = 1;
    const randomWorkId = 101;
    const foundAuthor: any = data.find((item) => item.id === randomAuthorId);
    const foundWriting: any = foundAuthor.writing.find(
      (item: any) => item.id === randomWorkId
    );
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
        this.stepsVar = Steps.Processing;
      });
      // this.stepsVar = Steps.Overview;
    }
  }
  startProcessing() {
    // localhost:44371/api/HypDoc/{fileName} [GET]
    this.fileProcessing = true;
    const file$ = this.apiService.hypDoc(
      `https://localhost:44371/api/HypDoc/${this.filename}`
    );
    file$.subscribe((res: any) => {
      this.filename = res.FileName;
      this.doneProcessing = true;
    });
  }
  test2() {
    const file$ = this.http.get(
      `https://localhost:44371/api/GetDocPage/${this.filename}`
    );
    file$.subscribe(console.log);
  }
  save() {
    // localhost: 44371 / api / SaveWork / { fileName } ? pdf = true / false(default false)
    this.http
      .get(`https://localhost:44371/api/SaveWork/${this.filename}`,
      {
        responseType: 'arraybuffer'
      })
      .subscribe(data => this.getZipFile(data));
    // file$.subscribe(console.log);
  }
  // downloadfile(filePath: string) {
  //   return this.http
  //     .get( URL_API_REST + 'download?filePath=' + filePath, {responseType: ResponseContentType.ArrayBuffer})
  //     .map(res =>  res)
  // }
  private getZipFile(data: any) {
    const blob = new Blob([data], { type: 'application/x-zip' });

    const a: any = document.createElement('a');
    document.body.appendChild(a);

    a.style = 'display: none';    
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${this.filename}`;
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
