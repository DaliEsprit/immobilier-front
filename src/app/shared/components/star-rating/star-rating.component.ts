import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() maxRating = 5; // Maximum number of stars
  @Input() rating = 0; // Current rating
  @Output() ratingChange = new EventEmitter<number>(); // Output event when rating changes

  // Array to hold the range of numbers for stars (e.g., [1, 2, 3, 4, 5])
  stars: number[] = [];

  constructor() {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
  }

  // Function to set the new rating when a star is clicked
  setRating(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
  }
}
