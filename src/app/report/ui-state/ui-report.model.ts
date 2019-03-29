import { Goalie } from '../state/report.model';

export interface UIReport {
  yearOptions: YearOption[];
  selectedYear: YearOptionValue;
  selectedGoalie: Goalie | undefined;
}

export type GoalieOptionValue = number | 'All';
export type YearOptionValue = 'All' | '2018' | '2017' | '2016' | '2015' | '2014';

export interface YearOption {
    name: YearOptionValue;
}
