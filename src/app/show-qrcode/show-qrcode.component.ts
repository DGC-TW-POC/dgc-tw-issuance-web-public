import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit } from '@angular/core';
import { initProgressbar } from '../shared/service/progress-bar.service';

@Component({
  selector: 'app-show-qrcode',
  templateUrl: './show-qrcode.component.html',
  styleUrls: ['./show-qrcode.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowQrcodeComponent implements OnInit, AfterViewInit {
  @Input() qrcode;
  @Input() email;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    initProgressbar(4);
  }

}
