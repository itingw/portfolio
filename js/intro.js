let renderIntroSkills = () => {
	introSkillsData.skills.forEach((skill) => {
		let introSkill = createIntroSkillColumn(skill);

		$('#aboutSkills').append(introSkill);

	});
};

let createIntroSkillColumn = (skill) => {
	let column = createElement({ 
		type: "div", 
		className: "col-12 col-sm-4 mb-5"
	});

	let icon = createElement({
		type: "i", 
		className: "fa fa-4x col-12 col-sm-4 gray " + skill.iconCls,
	});

	let title = createElement({
		type: "h4", 
		className: "mb-5 mt-5", 
		innerHTML: skill.title, 
	});

	let description = createElement({
		type: "h6",
		className: "m-3",
		innerHTML: skill.description,
	});

	let skillList = createElement({
		type: "ul",
		className: "skills",
	});
	skill.skills.forEach((skill) => {
		let skillBullet = createElement({
			type: "li", 
			innerHTML: skill
		});
		skillList.append(skillBullet);
	});

	column.append(icon, title, description, skillList);

	return column
};