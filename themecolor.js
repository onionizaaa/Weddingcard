"use strict";
(function () {
	window.onload = () => {
		const galleries = document.querySelectorAll(".gallery");
		const time = 10000;

		function animStart(obj) {
			if (!obj.classList.contains("active")) {
				obj.classList.add("active");
				setTimeout(() => {
					animEnd(obj);
				}, time);
			}
		}

		function animEnd(obj) {
			obj.classList.remove("active");
			obj.offsetWidth;
		}

		function triggerAll() {
			galleries.forEach(gallery => animStart(gallery));
		}

		document.addEventListener("scroll", triggerAll);
		window.addEventListener("resize", triggerAll);
		triggerAll();
	};
})();

// function([string1, string2],target id,[color1,color2])
//consoleText(['She said yes.', 'He said finally.', 'Now we say: Welcome to our wedding!'], 'text',['tomato','rebeccapurple','lightblue']);

// function consoleText(words, id, colors) {
  // if (colors === undefined) colors = ['#fff'];
  // var visible = true;
  // var con = document.getElementById('console');
  // var letterCount = 1;
  // var x = 1;
  // var waiting = false;
  // var target = document.getElementById(id)
  // target.setAttribute('style', 'color:' + colors[0])
  // window.setInterval(function() {

  //   if (letterCount === 0 && waiting === false) {
  //     waiting = true;
  //     target.innerHTML = words[0].substring(0, letterCount)
  //     window.setTimeout(function() {
  //       var usedColor = colors.shift();
  //       colors.push(usedColor);
  //       var usedWord = words.shift();
  //       words.push(usedWord);
  //       x = 1;
  //       target.setAttribute('style', 'color:' + colors[0])
  //       letterCount = 1;
  //       waiting = false;
  //     }, 1000)
  //   } else if (letterCount === words[0].length + 1 && waiting === false) {
  //     waiting = true;
  //     window.setTimeout(function() {
  //       x = -1;
  //       letterCount = 1;
  //       waiting = false;
  //     }, 1000)
  //   } else if (waiting === false) {
  //     target.innerHTML = words[0].substring(0, letterCount)
  //     letterCount = 1;
  //   }
  // }, 120)
  // window.setInterval(function() {
  //   if (visible === true) {
  //     con.className = 'console-underscore hidden'
  //     visible = false;

  //   } else {
  //     con.className = 'console-underscore'

  //     visible = true;
  //   }
  // }, 400)
  

  consoleText(['She said yes.', 'He said finally.', 'Now we say:<br>Welcome to our wedding!'], 'text', ['tomato', 'rebeccapurple', 'lightblue']);

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
          target.innerHTML = words[wordIndex].substring(0, letterCount + 1); // พิมพ์ข้อความ
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
  