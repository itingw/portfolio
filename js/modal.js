let openModal = (modalName) => {

  modalName.style.display = "block";
}

let closeModal = (modalName) => {
  modalName.style.display = "none";
}

let slideIndex = 1;

let plusSlides =(n, modalName) => {
  showSlides(slideIndex += n, modalName);
}

let currentSlide = (n, modalName) => {
  showSlides(slideIndex = n, modalName);
}

let showSlides = (n, modalName) => {

  let i;
  let slides = modalName.getElementsByClassName("mySlides");
  let dots = modalName.getElementsByClassName("demo");
  let captionText = modalName.getElementsByClassName("caption");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
