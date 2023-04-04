$(() => {

  let display = {

    init() {
      this.renderIntroSkills();
      this.renderExperience();
      this.renderProjectSkills();
      this.renderProjects();
    },
    renderIntroSkills() {
      introSkillsData.skills.forEach((skill) => {
        let introSkill = this.createIntroSkillColumn(skill);

        $('#aboutSkills').append(introSkill);

      });

    },
    renderExperience() {
      //add experiences renderer here!
      console.log("experience!", experienceData);
    },
    renderProjectSkills() {
      let skillsRow = this.createRow();

      let allButton = this.createProjectSkillButton("fas fa-asterisk", " see all", true);
      skillsRow.append(allButton);

      projectSkillsData.skills.forEach((skill) => {
        let skillButton = display.createProjectSkillButton(skill.icon, skill.name, false);
        skillsRow.append(skillButton);
      });

      $('#projects').append(skillsRow);

    },
    createElement: ( elementData ) => {
      let element = document.createElement(elementData.type);
      element.id = elementData.id ? elementData.id : "";
      element.className = elementData.className ? elementData.className : "";
      element.innerHTML = elementData.innerHTML ? elementData.innerHTML : "";
      element.src = elementData.src ? elementData.src : null;
  
      return element;
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
    createProjectSkillButton(iconClass, innerHTML, active) {
      let button = this.createElement({
        type: "button",
        id: innerHTML,
        className: active ? "skill btn selected" : "skill btn",
        innerHTML: " " + innerHTML,
      });

      button.onclick = () => {
        display.filterCards(innerHTML);
      };

      let icon = this.createElement({
        type: "i",
        className: iconClass,
      })

      button.prepend(icon);

      return button;
    },
    renderProjects() {
      let projectsRow = this.createRow();

      projectsData.projects.forEach((project, i) => {
        let projectCard = display.createCard(project.thumb, project.name, project.skillTag, project.desc, i);
        projectsRow.append(projectCard);
      });

      $("#projects").append(projectsRow);

    },
    createRow() {
      let row = this.createElement({
        type: "div", 
        className: "row row content col"
      });
      return row;
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
      });
      card.onclick = () => {
        display.openModal(index);
      }

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
