import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Observable, of, tap } from 'rxjs';
import {
  BarbarismPost,
  BarbarismsService,
} from 'src/app/services/barbarisms.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent implements OnInit {
  editorForm: FormGroup | undefined;
  searchForm: FormGroup | undefined;
  barbarisms$: Observable<BarbarismPost[]> | undefined;
  allBarbarisms: BarbarismPost[] | undefined;
  searchedArr: BarbarismPost[] = [];

  constructor(
    private fb: FormBuilder,
    private barbarismService: BarbarismsService
  ) {}
  checkText() {}
  ngOnInit() {
    this._initSearchForm();
    // this._initEditorForm();
    this.getBarbarisms();
    
    this.listeningSearch();
  }
  // private _initEditorForm() {
  //   this.editorForm = this.fb.group({
  //     barbarisms: [''],
  //     morphology: [''],
  //   });
  // }
  private _initSearchForm() {
    this.searchForm = this.fb.group({
      searchText: '',
    });
  }
  getBarbarisms() {
    this.barbarismService
      .getBarbarisms('https://localhost:44371/api/Barbarism/GetAllBarbarisms')
      .pipe(tap((data: any) =>this.allBarbarisms = data)).subscribe();
  }
  listeningSearch() {
    if (this.searchForm)
      this.searchForm.valueChanges
        .pipe(debounceTime(700), tap(console.log))
        .subscribe(({ searchText }) => {
          if (!searchText) {
            this.searchedArr = [];
            return;
          }
          this.searchedArr = [];
          this.allBarbarisms?.forEach((item) => {
            if (
              item.Wrong_Word.startsWith(searchText) ||
              item.Wrong_Word === searchText
            ) {
              this.searchedArr?.push(item);
            }
          });
          if (this.searchedArr) this.barbarisms$ = of(this.searchedArr);
        });
  }
}
