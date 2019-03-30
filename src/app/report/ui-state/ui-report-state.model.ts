export interface UIReportState {
  yearOptions: YearOption[];
  filterOptions: FilterOption[];
  fetching: boolean;
}

export type YearOptionName = 'All (2010-2019)' | '2018-19' | '2017-18' | '2016-17' | '2015-16' | '2014-15' | '2013-14' | '2012-13' | '2011-12' | '2010-11';
export type YearOptionValue = 'all' | '2018' | '2017' | '2016' | '2015' | '2014' | '2013' | '2012' | '2011' | '2010';

export interface YearOption {
    name: YearOptionName;
    value: YearOptionValue;
}

export type FilterOptionName = 'Coming Off Bench' | 'Include Overtime Data';
export type FilterOptionValue = 'comingOffBench' | 'includeOvertime';
export interface FilterOption {
  name: FilterOptionName;
  value: FilterOptionValue;
}
