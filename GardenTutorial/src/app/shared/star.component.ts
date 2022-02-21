import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges{

    // Input is used here as this variable is decided by the parent component (product list) sending data
    @Input() rating = 0;
    cropWidth: number = 75;

    //Output to send data in an event to the parent component (product list)
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    //show the correct amount of stars for each rating
    ngOnChanges(): void {
        this.cropWidth = this.rating * 75 / 5;
      }
    

    //onclick send the rating in a string to the parent component 
    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }

}



