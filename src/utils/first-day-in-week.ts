export function firstDayInWeek(data: Date) {
  let firstDayWeek = new Date(data);
  const currentDay = data.getDay();
  firstDayWeek.setDate(data.getDate() - currentDay);
  
  return firstDayWeek;
}