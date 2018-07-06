// BUILD A TABLE FROM MOUNTAINS DATA
const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' }
];
{
  // DOM PIECES
  const tableRoot = document.createDocumentFragment();
  const tableRow = document.createElement('tr');
  const tableCell = document.createElement('td');
  const headTableCell = document.createElement('th');

  // UTLILITY FUNCTION
  function createRowFromObj(obj) {
    const row = tableRow.cloneNode();
    Object.keys(obj).forEach(key => {
      const cell = tableCell.cloneNode();
      cell.innerHTML = obj[key];
      row.appendChild(cell);
    });
    return row;
  }

  // TABLE BUILDING VIA DOCUMENT FRAGMENT
  const tableHead = tableRow.cloneNode();
  Object.keys(MOUNTAINS[0]).forEach(key => {
    const headCell = headTableCell.cloneNode();
    headCell.innerHTML = key;
    tableHead.appendChild(headCell);
  });

  tableRoot.appendChild(tableHead);
  MOUNTAINS.forEach(m => {
    tableRoot.appendChild(createRowFromObj(m));
  });

  // DOM MODIFICATION
  document.getElementById('mountains').appendChild(tableRoot);
}
