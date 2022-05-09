import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
export interface fileObject {
  FileName: string;
  FileSize: string;
}

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent {
  fileName = '';
  file = '';
  html: any;
  bla: any;
  constructor(private http: HttpClient, private apiService: ApiService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('thumbnail', file);

      // const upload$ = this.http.post(
      //   'https://localhost:44371/api/TakeDoc',
      //   formData,
      // // );
      // let head = new Headers();
      // /** In Angular 5, including the header Content-Type can invalidate your request */
      // head.append('Content-Type', 'multipart/form-data');
      // head.append('Accept', 'application/json');
      const upload$ = this.apiService.uploadFile(
        'https://localhost:44371/api/TakeDoc',
        formData
      );

      upload$.subscribe((res) => {
        this.bla = res;
        console.log(res)
        // console.log(this.bla.FileName);
        // this.test(this.bla.FileName)
      });

      // upload$.subscribe({
      //   complete: () => console.log('comp'),
      //   error: (error) => this.file =  error.error.text,
      // });
    }
  }
  test() {
    // localhost:44371/api/HypDoc/{fileName} [GET]
    const file$ = this.apiService.hypDoc(`https://localhost:44371/api/HypDoc/${this.bla.FileName}`)
    // const f = this.file.split(';')[0];
    console.log(this.bla.FileName);
    // const file$ = this.http.get(`https://localhost:44371/api/HypDoc/${f}`);
    // file$.subscribe(console.log);
    // const file$ = this.http.get(`https://localhost:44371/api/GetDocPage/${this.bla.FileName}`);
    file$.subscribe(console.log);
  }
  test2() {
    const file$ = this.http.get(`https://localhost:44371/api/GetDocPage/${this.bla.FileName}`);
    file$.subscribe(console.log);
  }
  save() {
    // localhost: 44371 / api / SaveWork / { fileName } ? pdf = true / false(default false)
    const file$ = this.http.get(`https://localhost:44371/api/SaveWork/${this.bla.FileName}`);
    file$.subscribe(console.log);
  }
}
