import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-info-findings',
  templateUrl: './report-info-findings.component.html',
  styleUrls: ['./report-info-findings.component.scss']
})
export class ReportInfoFindingsComponent implements OnInit {
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
