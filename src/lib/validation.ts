export function isValuePresent(value: string) {
  return value.trim() !== "";
}

export function isValidDay(value: string) {
  const dayNum = Number(value);
  return dayNum >= 1 && dayNum <= 31;
}

export function isValidMonth(value: string) {
  const monthNum = Number(value);
  return monthNum >= 1 && monthNum <= 12;
}

export function isValidYear(value: string) {
  const yearNum = Number(value);
  return yearNum > 0 && yearNum.toString().length === 4;
}

export function isExceededYear(value: string) {
  const yearNum = Number(value);
  const currentYear = new Date().getFullYear();
  return yearNum <= currentYear;
}

export function isValidDate(dateString: string) {
  const dateParts = dateString.split("-");

  // Check if the date parts are in the correct format
  if (dateParts.length !== 3) {
    return false;
  }

  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  // Construct a new date object
  const date = new Date(year, month - 1, day); // JS months start from 0

  // Check if the date object represents the same date we attempted to set
  if (
    date &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  ) {
    return true;
  }

  return false;
}
