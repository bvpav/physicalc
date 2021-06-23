// данни

const TAGS = {
  механика: { color: 'link' },
  движение: { color: 'warning' },
};

const CALCS = [
  {
    name: 'Калкулатор за скорост',
    file: 'svt_speed_calculator.html',
    image: null,
    tags: ['механика', 'движение'],
  },
  {
    name: 'Калкулатор за време',
    file: 'svt_time_calculator.html',
    image: null,
    tags: ['механика', 'движение'],
  },
  {
    name: 'Калкулатор за път',
    file: 'svt_distance_calculator.html',
    image: null,
    tags: ['механика', 'движение'],
  },
  {
    name: 'Калкулатор за средна скорост',
    file: 'sredna_skorost1_calcualtor.html',
    image: null,
    tags: ['движение'],
  },
];

const calcList = document.getElementById('calc-list');

function createCard(calc) {
  const urlPrefix = '/calculators/';

  const card = document.createElement('article');
  card.className = 'card';

  const image = document.createElement('div');
  image.className = 'card-image';
  card.appendChild(image);
  const figure = document.createElement('figure');
  figure.className = 'image is-16by9';
  figure.style.background = '#ccc';
  image.appendChild(figure);

  const content = document.createElement('div');
  content.className = 'card-content';
  card.appendChild(content);
  const p = document.createElement('p');
  p.className = 'title is-4';
  content.appendChild(p);
  const a = document.createElement('a');
  a.className = 'title is-4';
  a.href = urlPrefix + calc.file;
  a.textContent = calc.name;
  p.appendChild(a);

  const tags = document.createElement('div');
  tags.className = 'content';
  for (const tag of calc.tags) {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.classList.add('text-icon');
    tagEl.classList.add('is-' + TAGS[tag].color);
    tagEl.classList.add('is-light');
    const icon = document.createElement('span');
    icon.classList = 'icon';
    icon.innerHTML = '<i class="fas fa-tag"></i>';
    tagEl.appendChild(icon);
    const label = document.createElement('span');
    label.textContent = tag;
    tagEl.appendChild(label);
    tags.appendChild(tagEl);
    tags.innerHTML += ' '; // хак, но работи
  }
  content.appendChild(tags);

  return card;
}

function addCalcs(htmlElement) {
  htmlElement.innerHTML = '';

  let row = null;

  let i;
  for (i in CALCS) {
    if (i % 3 === 0) {
      row = document.createElement('div');
      row.className = 'columns';
      htmlElement.appendChild(row);
    }

    const calc = CALCS[i];

    const column = document.createElement('div');
    column.className = 'column';

    const card = createCard(calc);
    column.appendChild(card);

    row.appendChild(column);
  }
  // не ми харесва този код, но трябва да добавим празни колони докато не се запълни
  // целия ред, иначе последните калкулатори ще са стречнати.
  while ((i + 1) % 3 !== 0) {
    const emptyColumn = document.createElement('div');
    emptyColumn.className = 'column';
    row.appendChild(emptyColumn);
    i++;
  }
}

if (calcList) {
  addCalcs(calcList);
}
