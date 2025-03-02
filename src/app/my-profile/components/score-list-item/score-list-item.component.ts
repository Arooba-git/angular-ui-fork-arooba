import { Component, OnInit, Input } from '@angular/core';
import { RatingService } from '../../../services/rating.service';

@Component({
  selector: 'app-score-list-item',
  templateUrl: './score-list-item.component.html',
  styleUrls: ['./score-list-item.component.scss']
})
export class ScoreListItemComponent implements OnInit {
  @Input() case: any;
  @Input() fontColor: string;
  public color: string;

  public result_score: number;
  public startTime: string;
  public endTime: string;
  public comments = [];
  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    this.result_score = Math.ceil(this.case.result_score);

    this.color = this.ratingService.getColorForScore(this.result_score);

    if ('comments' in this.case && this.case.comments) {
      this.comments = this.case.comments;
    }

    const startTimeArr = this.case.open_timestamp.split(' ')[0].split('-');
    this.startTime = `${startTimeArr[2]}.${startTimeArr[1]}.${startTimeArr[0]}`;
    const endTimeArr = this.case.close_timestamp.split(' ')[0].split('-');
    this.endTime = `${endTimeArr[2]}.${endTimeArr[1]}.${endTimeArr[0]}`;
  }
}
