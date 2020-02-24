function openModal(modalName) {

  modalName.style.display = "block";
}

function closeModal(modalName) {
  modalName.style.display = "none";
}

var slideIndex = 1;

function plusSlides(n, modalName) {
  showSlides(slideIndex += n, modalName);
}

function currentSlide(n, modalName) {
  showSlides(slideIndex = n, modalName);
}

function showSlides(n, modalName) {

  var i;
  var slides = modalName.getElementsByClassName("mySlides");
  var dots = modalName.getElementsByClassName("demo");
  var captionText = modalName.getElementsByClassName("caption");

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
