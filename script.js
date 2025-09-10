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
