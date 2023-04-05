$(() => {

  let display = {

    init() {
      this.renderIntroSkills();
      this.renderExperience();
      this.renderProjectSkills();
      this.renderProjects();
    },
    createElement: ( elementData ) => {
      let element = document.createElement(elementData.type);
      element.id = elementData.id ? elementData.id : "";
      element.className = elementData.className ? elementData.className : "";
      element.innerHTML = elementData.innerHTML ? elementData.innerHTML : "";
      element.src = elementData.src ? elementData.src : null;
      element.role = elementData.role ? elementData.role : null;
      element.onclick = elementData.onClick ? elementData.onClick : null;

      elementData.dataToggle ? element.setAttribute("data-toggle", elementData.dataToggle) : null;
      elementData.dataTarget ? element.setAttribute("data-target", elementData.dataTarget) : null;
      elementData.dataParent ? element.setAttribute("data-parent", elementData.dataParent) : null;

      return element;
    },
    createRow(className) {
      let row = this.createElement({
        type: "div", 
        className: className,
      });
      return row;
    },
    renderIntroSkills() {
      introSkillsData.skills.forEach((skill) => {
        let introSkill = this.createIntroSkillColumn(skill);

        $('#aboutSkills').append(introSkill);

      });
    },
    renderExperience() {
      let experienceRow = this.createRow("row row-content");

      let accordionDiv = this.createElement({
        id: "accordion",
        type: "div",
        className: "col-12",
      });

      experienceData.experience.forEach((experience, i) => {
        let experienceCard = this.createExperienceCard(experience, i);
        accordionDiv.append(experienceCard);
      })

      experienceRow.append(accordionDiv)
    
      $('#experience').append(experienceRow);

    },
    renderProjectSkills() {
      let skillsRow = this.createRow("row row content col");

      let allButton = this.createProjectSkillButton("fas fa-asterisk", " see all", true);
      skillsRow.append(allButton);

      projectSkillsData.skills.forEach((skill) => {
        let skillButton = display.createProjectSkillButton(skill.icon, skill.name, false);
        skillsRow.append(skillButton);
      });

      $('#projects').append(skillsRow);

    },
    renderProjects() {
      let projectsRow = this.createRow("row row content col");

      projectsData.projects.forEach((project, i) => {
        let projectCard = display.createCard(project.thumb, project.name, project.skillTag, project.desc, i);
        projectsRow.append(projectCard);
      });

      $("#projects").append(projectsRow);

    },
    createIntroSkillColumn(skill) {
      let column = this.createElement({ 
        type: "div", 
        className: "col-12 col-sm-4 mb-5"
      });

      let icon = this.createElement({
        type: "i", 
        className: "fa fa-4x col-12 col-sm-4 gray " + skill.iconCls,
      });

      let title = this.createElement({
        type: "h4", 
        className: "mb-5 mt-5", 
        innerHTML: skill.title, 
      });

      let description = this.createElement({
        type: "h6",
        className: "m-3",
        innerHTML: skill.description,
      });

      let skillList = this.createElement({
        type: "ul",
        className: "skills",
      });
      skill.skills.forEach((skill) => {
        let skillBullet = this.createElement({
          type: "li", 
          innerHTML: skill
        });
        skillList.append(skillBullet);
      });

      column.append(icon, title, description, skillList);

      return column
    },
    createExperienceCard(experience, i) {
      let card = this.createElement({
        type: "div",
        className: "card",
      });

      let cardHeader = this.createElement({
        type: "div",
        className: "card-header",
        role: "tab",
        id: experience.id + "head",
        dataToggle: "collapse",
        dataTarget: "#" + experience.id,
      });

      let cardTitle = this.createElement({
        type: "h6",
        className: "mb-0",
        innerHTML: experience.title + " " + `<small>` + experience.subtitle + `</small>`
      });
    
      cardHeader.append(cardTitle);

      let tabpanel = this.createElement({
        type: "div",
        className: i === 0 ? "collapse show": "collapse",
        id: experience.id,
        dataParent: "#accordion",
        role: "tabpanel",
      });
      
      let cardBody = this.createElement({
        type: "div",
        className: "card-body",
      });

      tabpanel.append(cardBody);

      let duration = this.createElement({
        type: "small",
        className: "row mb-2 ml-1",
        innerHTML: experience.duration,
      });

      let descriptionWrapper = this.createElement({ type: "small"});
      let descriptionList = this.createElement({type: "ul"});
      experience.description.forEach((bullet) => {
        let bulletItem = this.createElement({
          type: "li",
          innerHTML: bullet
        });
        descriptionList.append(bulletItem);
      });

      descriptionWrapper.append(descriptionList);
      cardBody.append(duration, descriptionWrapper);
      card.append(cardHeader, tabpanel);
      
      return card;

    },
    createProjectSkillButton(iconClass, innerHTML, active) {
      let button = this.createElement({
        type: "button",
        id: innerHTML,
        className: active ? "skill btn selected" : "skill btn",
        innerHTML: " " + innerHTML,
        onClick: () => {
          display.filterCards(innerHTML);
        }
      });

      let icon = this.createElement({
        type: "i",
        className: iconClass,
      })

      button.prepend(icon);

      return button;
    },
    openModal(projIndex) {
      let project = projectsData.projects[projIndex];

      $(".modal-title").html(project.name);
      $('.carousel-item').remove();
      
      project.images.forEach((image, i) => {
        let img = this.createElement({
          type: "img", 
          className: "img-fluid", 
          innerHTML: null, 
          src: image,
        });
        let caption = this.createElement({
          type: "p", 
          className: null, 
          innerHTML: project.captions[i]
        });
        let captionDiv = this.createElement({
          type: "div", 
          className: "carousel-caption"
        });

        captionDiv.append(caption);

        let carouselItemCls = (i===0)? "carousel-item active" : "carousel-item"
        let carouselItem = this.createElement({
          type: "div", 
          className: carouselItemCls
        });

        carouselItem.append(img, captionDiv);

        $(".carousel-inner").append(carouselItem);
      });

      $("#projectModal").modal('show');

    },
    createCard(projectThumb, projectTitle, skillTagData, projectDesc, index) {
      let card = this.createElement({
        type: "div",
        className: "project card col-6 col-sm-4 col-md-3",
        onClick: () => {
          display.openModal(index);
        },
      });

      let thumb = this.createElement({
        type: "img",
        className: "card-img",
        src: projectThumb,
      });

      let overlay = this.createElement({
        type: "div",
        className: "card-img-overlay",
      });

      let title = this.createElement({
        type: "h6",
        className: "card-title",
        innerHTML: projectTitle,
      });

      let skillTagGroup = this.createElement({
        type: "div",
        className: "skill-tags"
      });

      skillTagData.forEach((skill) => {
        let skillTag = display.createSkillTag(skill);
        skillTagGroup.className = "d-none d-lg-block";
        skillTagGroup.append(skillTag);
      });

      let description = this.createElement({
        type: "small",
        className: "card-text d-none d-lg-block",
        innerHTML: projectDesc,
      });

      overlay.append(title, skillTagGroup, description);

      card.append(thumb, overlay);

      return card;
    },
    createSkillTag(skill) {
      let skillTag = this.createElement({
        type: "button",
        className: "skillTag disabled " + skill,
        innerHTML: skill,
      });

      return skillTag;
    },
    filterCards(skill) {
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

    },
  }

display.init();

});
