import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'

const config = {
  theme: 'light',
  reveal: false,
}

const ctrl = new Pane({
  title: 'Config',
  expanded: true,
})

const update = () => {
  document.documentElement.dataset.theme = config.theme
  document.documentElement.dataset.reveal = config.reveal
}

const sync = (event) => {
  if (
    !document.startViewTransition ||
    event.target.controller.view.labelElement.innerText !== 'Theme'
  )
    return update()
  document.startViewTransition(() => update())
}

ctrl.addBinding(config, 'theme', {
  label: 'Theme',
  options: {
    System: 'system',
    Light: 'light',
    Dark: 'dark',
  },
})

ctrl.addBinding(config, 'reveal', {
  label: 'Reveal',
})

ctrl.on('change', sync)
update()

if (
  !CSS.supports('(animation-timeline: view()) and (animation-range: 0 100%)')
) {
  class Slider {
    constructor(element) {
      const input = element.querySelector('[type=range]')
      const sync = () => {
        const val = (input.value - input.min) / (input.max - input.min)
        element.style.setProperty('--slider-complete', Math.round(val * 100))
      }
      console.info('polyfilling scroll animation for input:', element)
      input.addEventListener('input', sync)
      input.addEventListener('pointerdown', ({ x, y }) => {
        const { left, top, height, width } = input.getBoundingClientRect()
        const vertical = height > width
        const range =
          Number.parseInt(input.max, 10) - Number.parseInt(input.min, 10)
        const ratio = vertical ? (y - top) / height : (x - left) / width
        // alert(ratio, val)
        const val = Number.parseInt(input.min, 10) + Math.floor(range * ratio)
        input.value = val
        sync()
      })
      sync()
    }
  }
  const sliders = document.querySelectorAll('.slider')
  for (const slider of sliders) new Slider(slider)
}

// To cross-check the input value with the visual value
// const input = document.querySelector('.slider input')
// input.addEventListener('input', () => {
//   console.info({
//     val: input.value,
//     complete: Math.round(
//       ((input.value - input.min) / (input.max - input.min)) * 100
//     ),
//   })
// })
consoleText(['She said yes.', 'He said finally.', 'Now we say:','Welcome to our wedding!'], 'text', ['tomato', 'rebeccapurple', 'lightblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 0;
  var waiting = false;
  var target = document.getElementById(id);
  target.setAttribute('style', 'color:' + colors[0]);
  var wordIndex = 0; // Track which word we're on

  window.setInterval(function() {
    if (waiting === false) {
      if (letterCount < words[wordIndex].length) {
        var displayText = words[wordIndex].substring(0, letterCount + 1);
        // ไม่ต้องใช้การแทนที่ <br> แค่ปล่อยให้มันเป็น HTML
        target.innerHTML = displayText; // ใช้ innerHTML เพื่อให้ <br> ทำงานได้
        letterCount++;
      } else {
        waiting = true;
        window.setTimeout(function() {
          var usedColor = colors.shift();
          colors.push(usedColor);
          letterCount = 0; // เริ่มต้นใหม่ที่ประโยคถัดไป
          wordIndex = (wordIndex + 1) % words.length; // ไปยังประโยคถัดไป
          target.setAttribute('style', 'color:' + colors[0]);
          waiting = false;
        }, 1000); // รอ 1 วินาทีระหว่างประโยค
      }
    }
  }, 120); // ความเร็วการพิมพ์

  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden';
      visible = false;
    } else {
      con.className = 'console-underscore';
      visible = true;
    }
  }, 400);
}





const slider = document.getElementById('slider');

slider.addEventListener('input', function() {
  if (this.value >= 100) {
    // ปิด Event กันสไลซ้ำ
    slider.disabled = true;

    // หน่วงเวลา 500ms (2 วินาที) ก่อนเปลี่ยนหน้า
    setTimeout(() => {
      window.location.href = 'indexsec.html'; // เปลี่ยนเป็นหน้าที่ต้องการไป
    }, 100);
  }
});
