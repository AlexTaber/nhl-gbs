import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-info-findings',
  templateUrl: './report-info-findings.component.html',
  styleUrls: ['./report-info-findings.component.scss']
})
export class ReportInfoFindingsComponent implements OnInit {
  @Output() close: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit() {
  }

  onClose(): void {
    this.close.emit();
  }
}
