import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-info-tutorial',
  templateUrl: './report-info-tutorial.component.html',
  styleUrls: ['./report-info-tutorial.component.scss']
})
export class ReportInfoTutorialComponent implements OnInit {
  @Output() close: EventEmitter<undefined> = new EventEmitter<undefined>();

  step = 0;

  constructor() { }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onClose(): void {
    this.close.emit();
  }
}
