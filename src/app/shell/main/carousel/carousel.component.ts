import { Component, OnInit } from '@angular/core';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowCircleRight = faArrowCircleRight;
  // slides: string[] = [
  //   '../../../../assets/images/Slider1.jpg',
  //   '../../../../assets/images/Slider2.jpg',
  //   '../../../../assets/images/Slider3.jpg',
  //   '../../../../assets/images/Slider4.jpg',
  // ];
  // i = 0;

  // getSlide() {
  //   return this.slides[this.i];
  // }

  // getPrev() {
  //   this.i = this.i === 0 ? 3 : this.i - 1;
  // }
  // //edit here
  // getNext() {
  //   this.i = this.i === 3 ? 0 : this.i + 1;
  //   console.log(this.i)
  // }
  // constructor() {}
  // ngOnInit(): void {
  //   // console.log(this.i)
  //   this.showSlides(this.slideIndex);
  // }

  // slideIndex = 1;

  // // Start autoplaying automatically
  // autoplayInterval = setInterval(() => {
  //   console.log('bla');
  //   (
  //     document.getElementById('slick-car')?.lastElementChild as HTMLElement
  //   ).click();
  // }, 2000); // Do this every 1 second, increase this!

  // // Stop function added to button
  // // stopAutoplay() {

  // //   // Stop the autoplay
  // //   clearInterval(this.autoplayInterval);

  // // }
  // // Next/previous controls
  // plusSlides(n:any) {
  //   this.showSlides(this.slideIndex += n);
  // }

  // // Thumbnail image controls
  // currentSlide(n:any) {
  //   this.showSlides(this.slideIndex = n);
  // }

  // showSlides(n:any) {
  //   let i;
  //   let slides = document.getElementsByClassName("mySlides");
  //   let dots = document.getElementsByClassName("dot");
  //   if (n > slides.length) {
  //     this.slideIndex = 1
  //   }
  //   if (n < 1) {
  //     this.slideIndex = slides.length
  //   }
  //   for (i = 0; i < slides.length; i++) {
  //     (slides[i] as HTMLElement).style.display = "none";
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  //   }

  //   (slides[this.slideIndex - 1] as HTMLElement).style.display = "block";
  //   dots[this.slideIndex - 1].className += " active";
  // }
  slides = [
    //   '../../../../assets/images/Slider1.jpg',
    //   '../../../../assets/images/Slider2.jpg',
    //   '../../../../assets/images/Slider3.jpg',
    //   '../../../../assets/images/Slider4.jpg',
    { img: '../../../../assets/images/Slider1.jpg' },
    { img: '../../../../assets/images/Slider2.jpg' },
    { img: '../../../../assets/images/Slider3.jpg' },
    { img: '../../../../assets/images/Slider4.jpg' },
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    fade: true,
    autoplaySpeed: 1800,
    dots: true
  };

  slickInit(e: any) {
    console.log('slick initialized');
  }
  
  constructor() {}
  ngOnInit(): void {}
}
