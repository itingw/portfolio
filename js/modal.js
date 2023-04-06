let openModal = (projIndex) => {
	let project = projectsData.projects[projIndex];

	$(".modal-title").html(project.name);
	$('.carousel-item').remove();
	
	project.images.forEach((image, i) => {
		let img = createElement({
			type: "img", 
			className: "img-fluid", 
			innerHTML: null, 
			src: image,
		});
		let caption = createElement({
			type: "p", 
			className: null, 
			innerHTML: project.captions[i]
		});
		let captionDiv = createElement({
			type: "div", 
			className: "carousel-caption"
		});

		captionDiv.append(caption);

		let carouselItemCls = (i===0)? "carousel-item active" : "carousel-item"
		let carouselItem = createElement({
			type: "div", 
			className: carouselItemCls
		});

		carouselItem.append(img, captionDiv);

		$(".carousel-inner").append(carouselItem);
	});

	$("#projectModal").modal('show');

};