export function padLeadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function addHyphenToDate(yyyymmdd) {
  const year = yyyymmdd.substring(0, 4);
  const month = yyyymmdd.substring(4, 6);
  const date = yyyymmdd.substring(6);

  const dateObj = new Date(year, parseInt(month) - 1, date);

  return `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}`;
}
