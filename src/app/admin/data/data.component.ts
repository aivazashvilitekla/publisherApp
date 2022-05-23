import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Barbarism, BarbarismsService } from 'src/app/services/barbarisms.service';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  faSearch = faSearch;

  barbarismForm: FormGroup | undefined;
  submitted: boolean = false;

  constructor(private barbarismService: BarbarismsService, private fb: FormBuilder,) { }

  private _initBarbarismForm() {
    this.barbarismForm = this.fb.group({
      wrong_word: ['', Validators.required],
      correct_word: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit() {
    this._initBarbarismForm();
  }

  onSubmit() {
    const api = '';
    const body: Barbarism = {
      wrong_word: '',
      correct_word: '',
      description: ''
    }
    if (this.barbarismForm?.valid) {
      this.barbarismService.addBarbarism(api, body).subscribe()
    }
  }
}
