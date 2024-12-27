/*
Snow Fall 1 - no images - Java Script
Visit http://rainbow.arch.scriptmania.com/scripts/
  for this script and many more
*/

// Конфигурация
var snowmax = 100; // Количество снежинок
var snowcolor = ["#b9dff5", "#b9dff5", "#b9dff5", "#b9dff5", "#b9dff5"]; // Цвет снежинок
var snowtype = ["Times"]; // Шрифт снежинок
var snowletter = "*"; // Символ снежинки
var sinkspeed = 0.6; // Скорость падения
var snowmaxsize = 35; // Максимальный размер снежинок
var snowminsize = 8; // Минимальный размер снежинок
var snowingzone = 1; // Зона выпадения снежинок: 1 — весь экран

// Глобальные переменные
var snow = [];
var marginbottom, marginright;
var x_mv = [];
var crds = [];
var lftrght = [];
var timer;
var browserinfos = navigator.userAgent;
var ie5 = document.all && document.getElementById && !browserinfos.match(/Opera/);
var ns6 = document.getElementById && !document.all;
var opera = browserinfos.match(/Opera/);
var browserok = ie5 || ns6 || opera;

function randommaker(range) {
  return Math.floor(range * Math.random());
}

function initsnow() {
  if (ie5 || opera) {
    marginbottom = document.body.scrollHeight;
    marginright = document.body.clientWidth - 15;
  } else if (ns6) {
    marginbottom = document.body.scrollHeight;
    marginright = window.innerWidth - 15;
  }
  var snowsizerange = snowmaxsize - snowminsize;
  for (let i = 0; i <= snowmax; i++) {
    crds[i] = 0;
    lftrght[i] = Math.random() * 15;
    x_mv[i] = 0.03 + Math.random() / 10;
    snow[i] = document.getElementById("s" + i);
    snow[i].style.fontFamily = snowtype[randommaker(snowtype.length)];
    snow[i].size = randommaker(snowsizerange) + snowminsize;
    snow[i].style.fontSize = snow[i].size + "px";
    snow[i].style.color = snowcolor[randommaker(snowcolor.length)];
    snow[i].style.zIndex = 1000;
    snow[i].sink = sinkspeed * snow[i].size / 5;
    snow[i].posx = randommaker(marginright - snow[i].size);
    snow[i].posy = randommaker(2 * marginbottom - marginbottom - 2 * snow[i].size);
    snow[i].style.left = snow[i].posx + "px";
    snow[i].style.top = snow[i].posy + "px";
  }
}

function movesnow() {
  for (let i = 0; i <= snowmax; i++) {
    crds[i] += x_mv[i];
    snow[i].posy += snow[i].sink;
    snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
    snow[i].style.top = snow[i].posy + "px";

    if (
      snow[i].posy >= marginbottom - 2 * snow[i].size ||
      parseInt(snow[i].style.left) > marginright - 3 * lftrght[i]
    ) {
      snow[i].posx = randommaker(marginright - snow[i].size);
      snow[i].posy = 0;
    }
  }
  timer = setTimeout(movesnow, 50);
}

function startSnow() {
  for (let i = 0; i <= snowmax; i++) {
    document.write(
      "<span id='s" +
        i +
        "' style='position:absolute;top:-" +
        snowmaxsize +
        "'>" +
        snowletter +
        "</span>"
    );
  }
  initsnow();
  movesnow();
}

function stopSnow() {
  clearTimeout(timer);
  for (let i = 0; i <= snowmax; i++) {
    if (snow[i]) {
      snow[i].parentNode.removeChild(snow[i]);
    }
  }
}

function canRunSnow() {
  // Проверка, нужно ли запускать снежок
  return true; // Можно добавить логику, например, проверку состояния в localStorage
}

// Запуск снежка при загрузке, если условие выполнено
if (canRunSnow() && browserok) {
  startSnow();
}

// Кнопка для управления снежком
document.body.innerHTML +=
  '<div id="toggleButton" style="width: 30px; height: 30px; border-radius: 30px; background: rgba(220,220,259,1); position: fixed; top: 10px; left: 10px; cursor: pointer;" onclick="toggleSnow()"></div>';

let snowEnabled = true;

function toggleSnow() {
  if (snowEnabled) {
    stopSnow();
    snowEnabled = false;
    console.log("Снежок выключен");
  } else {
    startSnow();
    snowEnabled = true;
    console.log("Снежок включен");
  }
}
