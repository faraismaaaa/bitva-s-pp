document.getElementById("addCircleButton").addEventListener("click", addCircle);

let activeCircle = null; // Переменная для хранения активного круга

function addCircle() {
  const slideArea = document.getElementById("slideArea");
  const circle = document.createElement("div");
  circle.classList.add("circle");

  // Генерация случайного размера (от 5% до 20% ширины контейнера)
  const size = Math.random() * 15 + 5; // От 5 до 20
  const circleSize = (slideArea.offsetWidth * size) / 100;
  circle.style.width = `${circleSize}px`;
  circle.style.height = `${circleSize}px`;

  // Генерация случайной позиции
  const posX = Math.random() * (slideArea.offsetWidth - circleSize);
  const posY = Math.random() * (slideArea.offsetHeight - circleSize);
  circle.style.left = `${posX}px`;
  circle.style.top = `${posY}px`;

  // Добавляем функционал перетаскивания и установки активного круга
  circle.addEventListener("pointerdown", startDrag);
  circle.addEventListener("click", () => setActiveCircle(circle));

  slideArea.appendChild(circle);
}

function startDrag(event) {
  const circle = event.target;
  const slideArea = document.getElementById("slideArea");

  // Координаты смещения для центрирования круга под курсором
  const circleRadiusX = circle.offsetWidth / 2;
  const circleRadiusY = circle.offsetHeight / 2;

  function onPointerMove(event) {
    let newLeft = event.clientX - slideArea.getBoundingClientRect().left - circleRadiusX;
    let newTop = event.clientY - slideArea.getBoundingClientRect().top - circleRadiusY;

    // Ограничения для движения внутри слайдера
    const rightEdge = slideArea.offsetWidth - circle.offsetWidth;
    const bottomEdge = slideArea.offsetHeight - circle.offsetHeight;

    // Проверяем, не выходит ли круг за пределы слайдера
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft > rightEdge) newLeft = rightEdge;
    if (newTop > bottomEdge) newTop = bottomEdge;

    // Применяем новые координаты
    circle.style.left = `${newLeft}px`;
    circle.style.top = `${newTop}px`;
  }

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", () => {
    document.removeEventListener("pointermove", onPointerMove);
  });
}

// Установка активного круга при клике на него
function setActiveCircle(circle) {
  if (activeCircle) activeCircle.classList.remove("active"); // Убираем предыдущий активный класс
  activeCircle = circle;
  activeCircle.classList.add("active"); // Добавляем активный класс
}

// Слушаем нажатие клавиши Backspace для удаления активного круга
document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace" && activeCircle) {
    activeCircle.remove(); // Удаляем активный круг
    activeCircle = null;   // Сбрасываем активный круг
  }
});

document.ondragstart = function() {
  return false;
};
