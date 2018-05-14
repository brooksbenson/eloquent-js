/*
  <h1>Mountains</h1>

  <div id="mountains"></div>
*/
const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' }
];

function tableRow(cellType, ...cells) {
  const row = document.createElement('tr');
  for (let content of cells) {
    const cell = document.createElement(cellType);
    if (typeof content != 'string') {
      cell.style.textAlign = content.align;
      cell.appendChild(document.createTextNode(content.text));
    } else {
      cell.appendChild(document.createTextNode(content));
    }
    row.appendChild(cell);
  }
  return row;
}

const table = document.createElement('table');
const headerData = [
  {
    text: 'Name',
    align: 'left'
  },
  {
    text: 'Height',
    align: 'right'
  },
  {
    text: 'Place',
    align: 'left'
  }
];
table.appendChild(tableRow('th', ...headerData));
for (let m of MOUNTAINS) {
  table.appendChild(
    tableRow('td', m['name'], { text: m['height'], align: 'right' }, m['place'])
  );
}

document.getElementById('mountains').appendChild(table);
