const slides = document.querySelectorAll('.slider')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const dotsContainer = document.querySelector('.dots-container')

let currentIndex = 0
let autoPlayInterval

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'))
  document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'))

  slides[index].classList.add('active')
  document.querySelectorAll('.dot')[index].classList.add('active')

  currentIndex = index
}

nextBtn.addEventListener('click', () => {
  let nextIndex = (currentIndex + 1) % slides.length
  showSlide(nextIndex)
  resetAutoPlay()
})

prevBtn.addEventListener('click', () => {
  let prevIndex = (currentIndex - 1 + slides.length) % slides.length
  showSlide(prevIndex)
  resetAutoPlay()
})

function nextSlider() {
  let nextIndex = (currentIndex + 1) % slides.length
  showSlide(nextIndex)
}

function StartAutoPlay() {
  autoPlayInterval = setInterval(nextSlider, 5000)
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval)
  StartAutoPlay()
}

function createDots() {
  slides.forEach((_, i) => {
    let dot = document.createElement('span')
    dot.classList.add('dot')
    dot.addEventListener('click', () => {
      currentIndex = i
      showSlide(currentIndex)
      resetAutoPlay()
    })
    dotsContainer.appendChild(dot)
  })
  showSlide(currentIndex)
}

createDots()
StartAutoPlay()

function initSnow() {
  const canvas = document.getElementById('snowCanvas');
  const ctx = canvas.getContext('2d');

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const flakes = [];
  const flakeCount = 100;

  class Flake {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.size = Math.random() * 3 + 2;
      this.speedY = Math.random() * 1 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.3;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < flakeCount; i++) {
    flakes.push(new Flake());
  }

  function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flakes.forEach(flake => {
      flake.update();
      flake.draw();
    });
    requestAnimationFrame(animateSnow);
  }

  animateSnow();
}

window.addEventListener('DOMContentLoaded', () => {
  initSnow();
});

const music = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');

muteBtn.addEventListener('click', () => {
  if (music.muted) {
    music.muted = false;
    muteBtn.textContent = '🔇';
  } else {
    music.muted = true;
    muteBtn.textContent = '🔊';
  }
});

const musik = document.getElementById('bg-music');
const volumeSlider = document.getElementById('volume-slider');

volumeSlider.addEventListener('input', () => {
  music.volume = volumeSlider.value / 100;  // Bagi 100 supaya skala 0-1
});

