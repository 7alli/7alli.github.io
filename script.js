console.clear();

function generateHWBpyramid(
h = Math.random() * 360,
minW = 0,
maxW = .2 + Math.random() * .4,
minB = 0,
maxB = .4 + Math.random() * .3,
startSteps = 1,
increment = 1,
floors = 4 + Math.round(Math.random() * 40),
hCycle = -.5 + Math.random())
{
  const $pyramid = document.createElement('div');
  $pyramid.classList.add('pyramid');

  const blackRange = maxB - minB;
  const whiteRange = maxW - minW;
  const blackStep = blackRange / floors;
  const whiteStep = whiteRange / floors;

  for (let i = 0; i < floors; i++) {
    let $row = document.createElement('div');
    $row.classList.add('row');

    for (let j = 0; j < i + increment + startSteps - 1; j++) {
      let $cell = document.createElement('div');
      $cell.classList.add('row__cell');

      let relativeFloor = i / floors;
      const hwbColor = [
      360 + (h + h * (hCycle * relativeFloor)) % 360,
      i ? minW + whiteRange * (j / (i + increment - 1)) : minW,
      minB + relativeFloor * blackRange];


      const hwbCSSString = `hwb(${hwbColor[0]} ${hwbColor[1] * 100}% ${hwbColor[2] * 100}%)`;
      $cell.style.setProperty(
      '--color',
      hwbCSSString);

      $row.appendChild($cell);
    }

    $pyramid.appendChild($row);
  }

  $pyramid.style.setProperty('--floors', floors);
  return $pyramid;
}

const $poster = document.querySelector('[data-poster]');

const justins = ["flex-start", "flex-end", "center" /*, "space-between", "space-around", "space-evenly"*/];

const doit = () => {
  $poster.classList.remove('glow');
  $poster.innerHTML = '';
  $poster.appendChild(generateHWBpyramid());
  if (Math.random() < .2) {
    $poster.style.setProperty('--gap', 1 + Math.random() * 1 + 'vmin');
  } else {
    $poster.style.setProperty('--gap', '0vmin');
  }


  if (Math.random() < .4) {
    $poster.style.setProperty('--justin', justins[Math.floor(Math.random() * justins.length)]);
  } else {
    $poster.style.setProperty('--justin', 'center');
  }

  if (Math.random() < .2) {
    $poster.style.setProperty('--direction', 'column-reverse');
  } else {
    $poster.style.setProperty('--direction', 'column');
  }

  Math.random() < .5 && $poster.classList.add('glow');
};

doit();

document.documentElement.addEventListener('click', doit);