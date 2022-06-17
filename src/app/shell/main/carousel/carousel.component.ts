import { Component, OnInit } from '@angular/core';
import {
  faArrowCircleLeft, faArrowCircleRight
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  faArrowCircleLeft = faArrowCircleLeft
  faArrowCircleRight = faArrowCircleRight
  slides: string[] = [
    '../../../../assets/images/authors/galaktion.jpg',
    '../../../../assets/images/authors/terenti.jpg',
    '../../../../assets/images/authors/Prince_Nikoloz_Baratashvili.jpg',
  ];
  i = 0;

  getSlide() {
    return this.slides[this.i];
  }

  getPrev() {
    this.i = this.i === 0 ? 2 : this.i - 1;
  }
  //edit here
  getNext() {
    this.i = this.i === 2 ? 0 : this.i + 1;
    console.log(this.i)
  }
  constructor() {}
  ngOnInit(): void {
    console.log(this.i)
  }
}
