/**
 * Returns a date in the format YYYY-MM-DD, with padding to ensure the month and day fields are always two digits.
 * @param {Date} date The date to be formatted.
 * @returns {string} A string in the format YYYY-MM-DD.
 */
export function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns a date in the format YYYY-MM, with padding to ensure the month field is always two digits.
 * @param {Date} date The date to be formatted.
 * @returns {string} A string in the format YYYY-MM.
 */
export function getFormatedDateYM(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  // const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}`;

}


/**
 * Returns a date in the format YYYY-MM-DD, with padding to ensure the month and day fields are always two digits.
 * @param {Date} date The date to be formatted.
 * @returns {string} A string in the format YYYY-MM-DD.
 */
export function getFormatedDateYMD(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getFormatedDay(date) {
/**
 * Returns the day of the month as a string, padded with a leading zero if
 * necessary to ensure a two-digit string.
 * @param {Date} date The date to be formatted.
 * @returns {string} A string in the format DD.
 */
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}`;
}