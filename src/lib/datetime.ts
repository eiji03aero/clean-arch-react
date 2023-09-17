export function datetimeNow() {
  return new Date();
}

export const Format = {
  YearMonthDate: (d: Date): DateString => {
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const date = `0${d.getDate()}`.slice(-2);
    return `${year}-${month}-${date}`;
  },
};

export const Parse = {
  YearMonthDate: (ds: DateString) => {
    const [year, month, date] = ds.split('-');
    return new Date(
      window.parseInt(year),
      window.parseInt(month) - 1,
      window.parseInt(date),
    );
  },
};
