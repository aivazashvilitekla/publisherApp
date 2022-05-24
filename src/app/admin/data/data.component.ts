import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';
import {
  Barbarism,
  BarbarismPost,
  BarbarismsService,
} from 'src/app/services/barbarisms.service';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;

  barbarismForm: FormGroup | undefined;
  submitted: boolean = false;
  barbarisms$: Observable<BarbarismPost[]> | undefined;
  editingMode = false;
  editingWordId: number | undefined;

  constructor(
    private barbarismService: BarbarismsService,
    private fb: FormBuilder,
    private toastrService: ToastrMessagesService
  ) {}

  private _initBarbarismForm() {
    this.barbarismForm = this.fb.group({
      Wrong_Word: ['', Validators.required],
      Correct_Word: ['', Validators.required],
      Description: ['', Validators.required],
    });
  }
  ngOnInit() {
    this._initBarbarismForm();
    this.getBarbarisms();
  }
  getBarbarisms() {
    this.barbarisms$ = this.barbarismService.getBarbarisms(
      'https://localhost:44371/api/Barbarism/GetAllBarbarisms'
    );
  }
  onSubmit() {
    const api = 'https://localhost:44371/api/Barbarism/AddBarbarism';

    if (this.barbarismForm?.valid) {
      const post = this.barbarismForm.value;
      console.log(this.barbarismForm.value);
      const body: Barbarism = {
        Wrong_Word: post.Wrong_Word,
        Correct_Word: post.Correct_Word,
        Description: post.Description,
      };
      console.log(body);
      this.barbarismService.addBarbarism(api, body).subscribe({
        complete: () => {
          this.barbarismForm?.reset();
          this.toastrService.showSuccessMessage('სიტყვა წარმატებით დაემატა');
          this.getBarbarisms();
        },
      });
    } else {
      console.log(';fsdfd');
    }
  }
  editMode(barbarism: BarbarismPost) {
    this.editingMode = true;
    this.editingWordId = barbarism.Id;
    this.barbarismForm?.patchValue({
      Wrong_Word: barbarism.Wrong_Word,
      Correct_Word: barbarism.Correct_Word,
    });
  }
  updateWord() {
    if (this.editingWordId) {
      const api = `https://localhost:44371/api/Barbarism/EditBarbarism/${this.editingWordId}`;
      const corWord = this.barbarismForm?.value.Correct_Word;
      const wrWord = this.barbarismForm?.value.Wrong_Word;
      if (corWord && wrWord) {
        const body: any = {
          Id: this.editingWordId,
          Wrong_Word: corWord,
          Correct_Word: wrWord,
        };
        console.log(body)
        this.barbarismService.editBarbarism(api, JSON.stringify(body)).subscribe({
          complete: () => {
            this.barbarismForm?.reset();
            this.toastrService.showSuccessMessage(
              'სიტყვა წარმატებით დარედაქტირდა'
            );
            this.getBarbarisms();
            this.editingMode = false;
          },
        });
      }
    }
  }
  deleteWord(id: number) {
    const api = `https://localhost:44371/api/Barbarism/DeleteBarbarism/${id}`;
    this.barbarismService.deleteBarbarism(api).subscribe({
      complete: () => this.getBarbarisms(),
    });
  }
  closeEditing() {
    this.barbarismForm?.reset();
    this.editingMode = false;
  }
}
