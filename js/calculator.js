const calculatorForm = document.getElementById('calculator-form');

// функция, която обновява формата за калкулатора
// разчита да са дефинирани 2 функции:
//
// ~==- check(formData) -==~
//    на това място може да правите проверки дали входните данни имат
//    допустими стойности и да се изчистят (пр. String => Number и т.н.)
//
//    formData е обект, съдържащ данните от формата, като може
//    да се види стойността на едно поле, като се извика get()
//
//    трябва да върне обект с параметри, които ще бъдат предадени на calculate(),
//    или null, ако има грешка. В такъв случай изпълнението няма да продължи.
//
// ~==- calculate(parameters) -==~
//   тук се правят същинските изчисления.
//
//   parameters е обектът, върнат от check()
//
//   трябва да върне обект, съдържащ css selector и нов текст.
//   примерно:
//
//       {
//         'h1': 'This is a heading',
//         '.important': (element) => element.innerText + 1,
//       }
//
//   текстът във всеки <h1> таг ще стане 'This is a heading' и
//   за всеки един елемент с class="important", ще се извика arrow функцията
//   като елемента ще се изпрати като параметър,
//   и в него ще се постави върнатата от нея стойност.
//   В този пример, функцията прибавя символът за 1 към края на текста на елемента
function update(event) {
  // когато се събмитне html форма, тя по подразбиране рефрешва стр.
  // понеже не искаме да се рефрешне, извикваме preventDefault
  // на евента, но само ако има такъв (update() може да се извика
  // и извън event listener)
  if (event) {
    event.preventDefault();
  }

  const formData = new FormData(calculatorForm);

  const parameters = check(formData);
  if (parameters === null) {
    // има грешка във входните данни
    return;
  }
  const changes = calculate(parameters);
  for (const selector in changes) {
    const elements = calculatorForm.querySelectorAll(selector);
    for (const element of elements) {
      let newText;
      if (typeof changes[selector] === 'function') {
        newText = changes[selector](element);
      } else {
        newText = changes[selector];
      }

      if (element instanceof HTMLInputElement) {
        element.value = changes[selector];
      } else {
        element.textContent = newText;
      }
    }
  }
}

update();
calculatorForm.addEventListener('input', update);
calculatorForm.addEventListener('submit', update);
