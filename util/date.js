export function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getFormatedDateYM(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  // const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}`;

}

export function getFormatedDateYMD(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
  // const day = date.getDate().toString().padStart(2, '0');
  // return `${year}-${month}`;

}

export function getFormatedDay(date) {
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}`;
}