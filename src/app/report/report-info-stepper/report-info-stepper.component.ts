import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-info-stepper',
  templateUrl: './report-info-stepper.component.html',
  styleUrls: ['./report-info-stepper.component.scss']
})
export class ReportInfoStepperComponent implements OnInit {
  @Output() done: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit() {
  }

  onDone(): void {
    this.done.emit();
  }
}
