// данни

const TAGS = {
  механика: { color: 'link' },
  движение: { color: 'warning' },
  изтрий: { color: 'danger' },
  'топлинни явления': { color: 'success' },
  'топлинни машини': { color: 'primary' },
  топлообмен: { color: 'danger' },
  топене: { color: 'danger' },
  изпарение: { color: 'danger' },
};

const CALCS = [
  {
    name: 'Калкулатор за скорост',
    file: 'svt_speed_calculator',
    image: 'biker-icon-background-.jpg',
    tags: ['механика', 'движение'],
  },
  {
    name: 'Калкулатор за време',
    file: 'svt_time_calculator',
    image: '96158341-stopwatch-icon-on-white.jpg',
    tags: ['механика', 'движение'],
  },
  {
    name: 'Калкулатор за път',
    file: 'svt_distance_calculator',
    image: '484141.png',
    tags: ['механика', 'движение'],
  },
  {
    name: 'Калкулатор за средна скорост',
    file: 'sredna_skorost1_calcualtor',
    image: 'average-icon-22.png',
    tags: ['движение'],
  },
  {
    name: 'Калкулатор за специфичен топлинен капацитет',
    file: 'toplina_stp_calculator',
    image: 'fire.jpg',
    tags: ['топлинни явления', 'топлообмен'],
  },
  {
    name: 'Калкулатор за специфична топлина на топене',
    file: 'specifichna_toplina_na_topene',
    image: 'fire.jpg',
    tags: ['топлинни явления', 'топене'],
  },
  {
    name: 'Калкулатор за специфична топлина на изпарение',
    file: 'specifichna_toplina_na_izparenie',
    image: 'fire.jpg',
    tags: ['топлинни явления', 'изпарение'],
  },
  {
    name: 'Калкулатор за КПД',
    file: 'kpd_calculator',
    image: '2667544.png',
    tags: ['топлинни явления', 'топлинни машини'],
  },
  {
    name: 'Калкулатор за КПД на идеална топлинна машина',
    file: 'kpd_na_idealna_mashina_calculator',
    image: '2667544.png',
    tags: ['топлинни явления', 'топлинни машини'],
  },
  {
    name: 'Калкулатор за кинетична енергия',
    file: 'kinetichna_energiq_calculator',
    image: '3314483-200.png',
    tags: ['механика', 'движение'],
  },
  {
    name: 'Калкулатор за потенциална енергия',
    file: 'potencialna_energiq_calculator',
    image: '1819275.png',
    tags: ['механика', 'движение'],
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
    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    card.appendChild(cardImage);
    const figure = document.createElement('figure');
    figure.className = 'image is-16by9';
    figure.style.background = '#ccc';
    const img = document.createElement('img');
    img.src = '/img/' + calc.image;
    img.alt = 'Снимка на ' + calc.name;
    figure.appendChild(img);
    cardImage.appendChild(figure);
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
    // не се опитвах да използвам regex-и, но се получи естествено
    // дано не се налага да ги обясняваме...
    const regularExpressionStuffIdk = new RegExp(searchTerm, 'gi'); // g - greedy i - case insensitive
    a.innerHTML = a.innerHTML.replace(
      regularExpressionStuffIdk,
      (s) => '<mark>' + s + '</mark>',
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
    calcsToShow = calcsToShow.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
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
