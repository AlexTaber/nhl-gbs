export interface UIReportState {
  yearOptions: YearOption[];
}

export type YearOptionValue = 'All' | '2018' | '2017' | '2016' | '2015' | '2014';

export interface YearOption {
    name: YearOptionValue;
}
