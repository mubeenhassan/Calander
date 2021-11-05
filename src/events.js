const events = [
  { title: 'All Day Event', start: getDate('YEAR-MONTH-01'), type: 'A' },
  {
    title: 'Long Event',
    start: getDate('YEAR-MONTH-07'),
    end: getDate('YEAR-MONTH-10'),
    type: 'B',
  },
  {
    title: 'Repeating Event',
    start: getDate('YEAR-MONTH-09T16:00:00+00:00'),
    type: 'A',
  },
  {
    title: 'Repeating Event',
    start: getDate('YEAR-MONTH-09T16:00:00+00:00'),
    type: 'D',
  },
  {
    groupId: '999',
    title: 'Repeating Event',
    start: getDate('YEAR-MONTH-16T16:00:00+00:00'),
    type: 'C',
  },
  {
    title: 'Conference',
    start: 'YEAR-MONTH-17',
    end: getDate('YEAR-MONTH-19'),
    type: 'A',
  },
  {
    title: 'Meeting',
    start: getDate('YEAR-MONTH-18T10:30:00+00:00'),
    end: getDate('YEAR-MONTH-18T12:30:00+00:00'),
    type: 'B',
  },
  {
    title: 'Lunch',
    start: getDate('YEAR-MONTH-18T12:00:00+00:00'),
    type: 'A',
  },
  {
    title: 'Birthday Party',
    start: getDate('YEAR-MONTH-19T07:00:00+00:00'),
    type: 'C',
  },
]

function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = "0" + month;
  }

  return dayString.replace("YEAR", year).replace("MONTH", month);
}

export default events;
