let renderProjects = () => {
	let projectsRow = createRow("row row content col");

	projectsData.projects.forEach((project, i) => {
		let projectCard = createCard(project.thumb, project.name, project.skillTag, project.desc, i);
		projectsRow.append(projectCard);
	});

	$("#projects").append(projectsRow);

};

let createCard = (projectThumb, projectTitle, skillTagData, projectDesc, index) => {
	let card = createElement({
		type: "div",
		className: "project card col-6 col-sm-4 col-md-3",
		onClick: () => {
			openModal(index);
		},
	});

	let thumb = createElement({
		type: "img",
		className: "card-img",
		src: projectThumb,
	});

	let overlay = createElement({
		type: "div",
		className: "card-img-overlay",
	});

	let title = createElement({
		type: "h6",
		className: "card-title",
		innerHTML: projectTitle,
	});

	let skillTagGroup = createElement({
		type: "div",
		className: "skill-tags"
	});

	skillTagData.forEach((skill) => {
		let skillTag = createSkillTag(skill);
		skillTagGroup.className = "d-none d-lg-block";
		skillTagGroup.append(skillTag);
	});

	let description = createElement({
		type: "small",
		className: "card-text d-none d-lg-block",
		innerHTML: projectDesc,
	});

	overlay.append(title, skillTagGroup, description);

	card.append(thumb, overlay);

	return card;
};

let createSkillTag = (skill) => {
	let skillTag = createElement({
		type: "button",
		className: "skillTag disabled " + skill,
		innerHTML: skill,
	});

	return skillTag;
};

let filterCards = (skill) => {
	let selectedSkillButton = document.getElementById(skill);
	if(selectedSkillButton && selectedSkillButton.classList.contains("selected")){
		return;
	}
	else {
		$(".skill").removeClass("selected");
		selectedSkillButton.classList.toggle("selected");

		if(skill === " see all") {
			$(".card").removeClass("hidden");
		}
		else {
			let skillClass = "." + skill;
			$(".card").addClass("hidden");
			$(".card " + skillClass).closest(".card").removeClass("hidden");
		}
	}

};