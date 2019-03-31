import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-theory',
  templateUrl: './report-theory.component.html',
  styleUrls: ['./report-theory.component.scss']
})
export class ReportTheoryComponent implements OnInit {
  @Output() close: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit() {
  }

  onClose(): void {
    this.close.emit();
  }
}
