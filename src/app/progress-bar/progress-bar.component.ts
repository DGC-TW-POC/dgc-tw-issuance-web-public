import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush ,
  encapsulation: ViewEncapsulation.Emulated
})
export class ProgressBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
