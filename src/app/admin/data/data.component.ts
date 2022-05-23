import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';
import {
  Barbarism,
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

  barbarismForm: FormGroup | undefined;
  submitted: boolean = false;
  barbarisms$: Observable<Barbarism[]> | undefined;

  constructor(
    private barbarismService: BarbarismsService,
    private fb: FormBuilder,
    private toastrService: ToastrMessagesService
  ) {}

  private _initBarbarismForm() {
    this.barbarismForm = this.fb.group({
      wrong_word: ['', Validators.required],
      correct_word: ['', Validators.required],
      description: ['', Validators.required],
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
      const body: Barbarism = {
        Wrong_Word: post.wrong_word,
        Correct_Word: post.correct_word,
        Description: post.description,
      };
      this.barbarismService.addBarbarism(api, body).subscribe({
        complete: () => {
          this.barbarismForm?.reset();
          this.toastrService.showSuccessMessage('სიტყვა წარმატებით დაემატა');
          this.getBarbarisms()
        },
      });
    } else {
      console.log(';fsdfd');
    }
  }
}
