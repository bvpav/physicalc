// данни

const TAGS = {
  механика: { color: 'link' },
  движение: { color: 'warning' },
  изтрий: { color: 'danger' },
  'топлинни явления': { color: 'success' },
  'топлинни машини': { color: 'primary' },
};

const CALCS = [
  {
    name: 'Калкулатор за скорост',
    file: 'svt_speed_calculator',
    image: null,
    tags: ['механика', 'движение'],
  },
  {
    name: 'Калкулатор за време',
    file: 'svt_time_calculator',
    image: null,
    tags: ['механика', 'движение'],
  },
  {
    name: 'Калкулатор за път',
    file: 'svt_distance_calculator',
    image: null,
    tags: ['механика', 'движение'],
  },
  {
    name: 'Калкулатор за средна скорост',
    file: 'sredna_skorost1_calcualtor',
    image: null,
    tags: ['движение'],
  },
  {
    name: 'Калкулатор за плюс едно',
    file: 'plus_one_calculator',
    image: null,
    tags: ['изтрий'],
  },
  {
    name: 'Калкулатор за КПД',
    file: 'kpd_calculator',
    image: null,
    tags: ['топлинни явления', 'топлинни машини'],
  },
  {
    name: 'Калкулатор за КПД на идеална топлинна машина',
    file: 'kpd_na_idealna_mashina_calculator',
    image: null,
    tags: ['топлинни явления', 'топлинни машини'],
  },
];

// код

const calcList = document.getElementById('calc-list');
const calcSearch = document.getElementById('calc-search');

function getSimilarCalcs(file) {
  const currentCalc = CALCS.find((calc) => calc.file === file);
  let similarCalcs = [];
  for (calc of CALCS) {
    if (calc === currentCalc) continue;
    let foundMutualTags = false;
    for (tag of calc.tags) {
      if (currentCalc.tags.includes(tag)) {
        foundMutualTags = true;
      }
    }
    if (!foundMutualTags) continue;

    similarCalcs.push(calc);
  }
  return similarCalcs;
}

function createCard(calc, searchTerm = '') {
  let urlPrefix = '';
  // relative paths
  if (!window.location.pathname.includes('/calculators/')) {
    urlPrefix = './calculators/';
  }

  const card = document.createElement('article');
  card.className = 'card';

  if (!window.location.pathname.includes('/calculators/')) {
    const image = document.createElement('div');
    image.className = 'card-image';
    card.appendChild(image);
    const figure = document.createElement('figure');
    figure.className = 'image is-16by9';
    figure.style.background = '#ccc';
    image.appendChild(figure);
  }

  const content = document.createElement('div');
  content.className = 'card-content';
  card.appendChild(content);
  const p = document.createElement('p');
  p.className = 'title is-4';
  content.appendChild(p);
  const a = document.createElement('a');
  a.className = 'title is-4';
  // TODO: ако няма нужда от .html, по-добре да не го прибавяме тук :)
  a.href = urlPrefix + calc.file + '.html';
  a.textContent = calc.name;
  if (searchTerm) {
    a.innerHTML = a.innerHTML.replaceAll(
      searchTerm,
      '<mark>' + searchTerm + '</mark>',
    );
  }
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

function addCalcs(htmlElement, searchTerm = '') {
  htmlElement.innerHTML = '';

  let calcsToShow;
  if (!location.pathname.includes('/calculators/')) {
    calcsToShow = CALCS; // началната стр показва всички калкулатори
  } else {
    // 1. намери името на текущия калкулатор
    let calcName = window.location.pathname;
    // премахни .html от края на името на калкулатура
    if (calcName.endsWith('.html')) {
      calcName = calcName.substring(0, calcName.lastIndexOf('.'));
    }
    // премахни всички '/' от началото на името на калкулатора
    calcName = calcName.substr(calcName.lastIndexOf('/') + 1);
    // 2. намери всички калкулатори, подобни на текущия
    calcsToShow = getSimilarCalcs(calcName);
  }

  if (searchTerm) {
    calcsToShow = calcsToShow.filter((c) => c.name.includes(searchTerm));
  }

  if (calcsToShow.length === 0) {
    const p = document.createElement('p');
    p.className = 'text is-size-5 has-text-weight-light';
    p.textContent = 'Няма намерени калкулатори ;-;';
    htmlElement.appendChild(p);
    return;
  }

  let row;

  let i;
  for (i in calcsToShow) {
    if (i % 3 === 0) {
      row = document.createElement('div');
      row.className = 'columns';
      htmlElement.appendChild(row);
    }

    const calc = calcsToShow[i];

    const column = document.createElement('div');
    column.className = 'column';

    const card = createCard(calc, searchTerm);
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
  if (calcSearch) {
    addCalcs(calcList, calcSearch.value);
    calcSearch.addEventListener('input', () =>
      addCalcs(calcList, calcSearch.value),
    );
  } else {
    addCalcs(calcList);
  }
}
