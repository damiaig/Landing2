document.addEventListener("DOMContentLoaded", function () {
    const element = document.getElementById("typewriter");
    const text = "Tired of being \naverage?"; // \n will become <br>
    let index = 0;
  
    function type() {
      if (index < text.length) {
        if (text[index] === "\n") {
          element.innerHTML += "<br>";
        } else {
          element.innerHTML += text[index];
        }
        index++;
        setTimeout(type, 100); // typing speed
      }
    }
  
    type();
  });
  
  document.getElementById("learn-more-btn").addEventListener("click", function () {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const counters = [
      { id: "students-count", max: 100, suffix: "+", speed: 600 },
      { id: "trades-count", max: 100, suffix: "+", speed: 600 },
      { id: "countries-count", max: 20, suffix: "+", speed: 2800 },
    ];

    let count = 0;
    let maxCount = Math.max(...counters.map(c => Math.ceil(c.max / (1000 / c.speed))));
    const delay = 4000; // Restart delay after all counters complete
    let interval;

    function startAllCounters() {
      count = 0;

      counters.forEach(c => {
        const el = document.getElementById(c.id);
        el.textContent = "0" + c.suffix;
      });

      interval = setInterval(() => {
        count++;

        counters.forEach(c => {
          const el = document.getElementById(c.id);
          const increment = c.max / maxCount;
          const current = Math.floor(increment * count);
          el.textContent = (current >= c.max ? c.max : current) + c.suffix;
        });

        if (count >= maxCount) {
          clearInterval(interval);
          setTimeout(startAllCounters, delay); // Restart all together
        }
      }, 30); // Shared speed (adjust if needed)
    }

    startAllCounters();
  });