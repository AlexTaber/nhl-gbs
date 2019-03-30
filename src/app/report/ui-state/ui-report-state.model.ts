export interface UIReportState {
  yearOptions: YearOption[];
  filterOptions: FilterOption[];
}

export type YearOptionValue = 'All' | '2018' | '2017' | '2016' | '2015' | '2014' | '2013' | '2012' | '2011' | '2010';

export interface YearOption {
    name: YearOptionValue;
}

export type FilterOptionName = 'Coming Off Bench' | 'Include Overtime Data';
export type FilterOptionValue = 'comingOffBench' | 'includeOvertime';
export interface FilterOption {
  name: FilterOptionName;
  value: FilterOptionValue;
}
