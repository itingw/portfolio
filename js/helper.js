
let HTMLmodalStart = '<div id="%modal%" class="modal"><span class="close cursor" onclick="closeModal(%modal%)">&times;</span><div class="modal-content"></div></div';
let HTMLmodalSlide = '<div class="mySlides"><div class="numbertext">%page%</div><img src=%data% style="width:100%"></div>';
let HTMLmodalArrows = '<a class="prev" onclick="plusSlides(-1, %modal%)">&#10094;</a><a class="next" onclick="plusSlides(1, %modal%)">&#10095;</a>';

let HTMLmodalCaption = '<div class="caption-container"><p class="caption"></p></div>';
let HTMLmodalColumn = '<div class="column"><img class="demo" src=%data% onclick="currentSlide(%slideNo%, %modal%)" alt="%content%"></div>';
