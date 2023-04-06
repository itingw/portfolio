let renderProjectSkills = () => {
	let skillsRow = createRow("row row content col");

	let allButton = createProjectSkillButton("fas fa-asterisk", " see all", true);
	skillsRow.append(allButton);

	projectSkillsData.skills.forEach((skill) => {
		let skillButton = createProjectSkillButton(skill.icon, skill.name, false);
		skillsRow.append(skillButton);
	});

	$('#projects').append(skillsRow);

};

let createProjectSkillButton = (iconClass, innerHTML, active) => {
	let button = createElement({
		type: "button",
		id: innerHTML,
		className: active ? "skill btn selected" : "skill btn",
		innerHTML: " " + innerHTML,
		onClick: () => {
			filterCards(innerHTML);
		}
	});

	let icon = createElement({
		type: "i",
		className: iconClass,
	})

	button.prepend(icon);

	return button;
};