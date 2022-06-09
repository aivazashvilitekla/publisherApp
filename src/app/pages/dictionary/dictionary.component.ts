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
  searchedArr: BarbarismPost[] = [];

  constructor(
    private fb: FormBuilder,
    private barbarismService: BarbarismsService
  ) {}
  checkText() {}
  ngOnInit() {
    this._initSearchForm();
    this._initEditorForm();
    this.getBarbarisms()
    this.listeningSearch();
  }
  private _initEditorForm() {
    this.editorForm = this.fb.group({
      barbarisms: [''],
      morphology: [''],
    });
  }
  private _initSearchForm() {
    this.searchForm = this.fb.group({
      searchText: '',
    });
  }
  getBarbarisms() {
    this.barbarisms$ = this.barbarismService.getBarbarisms(
      'https://localhost:44371/api/Barbarism/GetAllBarbarisms'
    );
  }
  listeningSearch() {
    if (this.searchForm)
      this.searchForm.valueChanges
        .pipe(debounceTime(700), tap(console.log))
        .subscribe(({ searchText }) => {
          if (!searchText) {
            return;
          }
          this.searchedArr = [];
          this.barbarisms$?.pipe(
            tap((data) => {
              const t = data.find(
                (item) =>
                  item.Wrong_Word.includes(searchText) ||
                  item.Wrong_Word === searchText
              );
              if (t) this.searchedArr?.push(t);
            })
          ).subscribe();
          if (this.searchedArr) this.barbarisms$ = of(this.searchedArr);
          console.log(this.searchedArr)
        });
    
  }
}
