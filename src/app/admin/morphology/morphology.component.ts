import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from '@firebase/util';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, Observable, of, tap } from 'rxjs';
import {
  Morphology,
  MorphologyPost,
  MorphologyService,
} from 'src/app/services/morphology.service';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';
@Component({
  selector: 'app-morphology',
  templateUrl: './morphology.component.html',
  styleUrls: ['./morphology.component.scss'],
})
export class MorphologyComponent implements OnInit {
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;

  morphologyForm: FormGroup | undefined;
  searchForm: FormGroup | undefined;
  submitted: boolean = false;
  morphologies$: Observable<MorphologyPost[]> | undefined;
  editingMode = false;
  editingWordId: number | undefined;

  morphologiesArr: MorphologyPost[] | undefined;
  searchedArr: MorphologyPost[] = [];

  constructor(
    private morphologyService: MorphologyService,
    private fb: FormBuilder,
    private toastrService: ToastrMessagesService
  ) {}

  private _initMorphologyForm() {
    this.morphologyForm = this.fb.group({
      Wrong_Word: ['', Validators.required],
      Correct_Word: ['', Validators.required],
    });
  }
  ngOnInit() {
    this._initSearchForm();
    this._initMorphologyForm();
    this.getMorphologies();
    this.listeningSearch();
  }
  private _initSearchForm() {
    this.searchForm = this.fb.group({
      searchText: '',
    });
  }
  listeningSearch() {
    if (this.searchForm)
      this.searchForm.valueChanges
        .pipe(debounceTime(700))
        .subscribe(({ searchText }) => {
          if (!searchText) {
            this.getMorphologies();
            return;
          }
          this.searchedArr = [];
          const temp = this.morphologies$?.pipe(
            tap((data) => {
              const t = data.find(
                (item) =>
                  item.Correct_Word.includes(searchText) ||
                  item.Correct_Word === searchText
              );
              if (t) this.searchedArr?.push(t);
            })
          );
          temp?.subscribe();
          if (this.searchedArr) this.morphologies$ = of(this.searchedArr);
        });
  }
  getMorphologies() {
    this.morphologies$ = this.morphologyService.getMorphologies(
      'https://localhost:44371/api/Morphology/GetAllMorphologies'
    );
  }
  onSubmit() {
    const api = 'https://localhost:44371/api/Morphology/AddMorphology';

    if (this.morphologyForm?.valid) {
      const post = this.morphologyForm.value;
      console.log(this.morphologyForm.value);
      const body: Morphology = {
        Wrong_Word: post.Wrong_Word,
        Correct_Word: post.Correct_Word,
      };
      console.log(body);
      this.morphologyService.addMorphology(api, body).subscribe({
        complete: () => {
          this.morphologyForm?.reset();
          this.toastrService.showSuccessMessage('სიტყვა წარმატებით დაემატა');
          this.getMorphologies();
        },
      });
    } else {
      this.toastrService.showErrorMessage('გთხოვთ შეავსეთ ყველა ველი');
    }
  }
  editMode(morphology: MorphologyPost) {
    this.editingMode = true;
    this.editingWordId = morphology.Id;
    this.morphologyForm?.patchValue({
      Wrong_Word: morphology.Wrong_Word,
      Correct_Word: morphology.Correct_Word,
    });
  }
  updateWord() {
    if (this.editingWordId) {
      const api = `https://localhost:44371/api/Morphology/EditMorphology/${this.editingWordId}`;
      const corWord = this.morphologyForm?.value.Correct_Word;
      const wrWord = this.morphologyForm?.value.Wrong_Word;
      if (corWord && wrWord) {
        const body: any = {
          Id: this.editingWordId,
          Wrong_Word: wrWord,
          Correct_Word: corWord,
        };
        console.log(body);
        this.morphologyService
          .editMorphology(api, JSON.stringify(body))
          .subscribe({
            complete: () => {
              this.morphologyForm?.reset();
              this.toastrService.showSuccessMessage(
                'სიტყვა წარმატებით დარედაქტირდა'
              );
              this.getMorphologies();
              this.editingMode = false;
            },
          });
      }
    }
  }
  deleteWord(id: number) {
    const api = `https://localhost:44371/api/Morphology/DeleteMorphology/${id}`;
    this.morphologyService.deleteMorphology(api).subscribe({
      complete: () => this.getMorphologies(),
    });
  }
  closeEditing() {
    this.morphologyForm?.reset();
    this.editingMode = false;
  }
}
