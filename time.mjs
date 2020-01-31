const services = [
  { start: secs(9), end: secs(10) },
  { start: secs(10, 30), end: secs(12) },
];

export function getTime() {
  const now = nowSecs();
  const dest = pickDest(now);
  const left = dest - now;

  if (dest === null) return 'No services found';
  if (left < 0) return 'Lets Start';

  if (left < 60) return left.toString();
  if (left < 3600)
    return Math.floor(left / 60).toString() + ':' + pad(left % 60);
  return (
    Math.floor(left / 3600).toString() +
    ':' +
    pad(Math.floor(left / 60) % 60) +
    ':' +
    pad(left % 60)
  );
}

function pickDest(now) {
  for (const service of services) {
    if (now < service.end) {
      return service.start;
    }
  }
  return null;
}

function nowSecs() {
  const nowDate = new Date();
  return secs(
    nowDate.getHours(),
    nowDate.getMinutes(),
    nowDate.getSeconds()
  // Implement late by pretending that it is earlier
  ) - secs(0, window.late || 0);
}

/**
 * Calculate the total number of seconds past midnight
 * @param {number} hrs Hours past midnight
 * @param {number} mins Minutes past midnight
 * @param {number} secs Seconds past midnight
 */
function secs(hrs, mins=0, secs=0) {
  return (hrs * 60 + mins) * 60 + secs;
}

/**
 * Padd a number with 0s so that it is 2+ chars long
 * @param {number} n The number to pad
 */
function pad(n) {
  let str = n.toString();
  while (str.length < 2) str = '0' + str;
  return str;
}
