let renderExperience = () => {
	let experienceRow = createRow("row row-content");

	let accordionDiv = createElement({
		id: "accordion",
		type: "div",
		className: "col-12",
	});

	experienceData.experience.forEach((experience, i) => {
		let experienceCard = createExperienceCard(experience, i);
		accordionDiv.append(experienceCard);
	})

	experienceRow.append(accordionDiv)

	$('#experience').append(experienceRow);

};

let createExperienceCard = (experience, i) => {
	let card = createElement({
		type: "div",
		className: "card",
	});

	let cardHeader = createElement({
		type: "div",
		className: "card-header",
		role: "tab",
		id: experience.id + "head",
		dataToggle: "collapse",
		dataTarget: "#" + experience.id,
	});

	let cardTitle = createElement({
		type: "h6",
		className: "mb-0",
		innerHTML: experience.title + " " + `<small>` + experience.subtitle + `</small>`
	});

	cardHeader.append(cardTitle);

	let tabpanel = createElement({
		type: "div",
		className: i === 0 ? "collapse show": "collapse",
		id: experience.id,
		dataParent: "#accordion",
		role: "tabpanel",
	});
	
	let cardBody = createElement({
		type: "div",
		className: "card-body",
	});

	tabpanel.append(cardBody);

	let duration = createElement({
		type: "small",
		className: "row mb-2 ml-1",
		innerHTML: experience.duration,
	});

	let descriptionWrapper = createElement({ type: "small"});
	let descriptionList = createElement({type: "ul"});
	experience.description.forEach((bullet) => {
		let bulletItem = createElement({
			type: "li",
			innerHTML: bullet
		});
		descriptionList.append(bulletItem);
	});

	descriptionWrapper.append(descriptionList);
	cardBody.append(duration, descriptionWrapper);
	card.append(cardHeader, tabpanel);
	
	return card;

};