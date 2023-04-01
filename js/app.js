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
    createElement: (type, className, innerHTML ) => {
      let element = document.createElement(type);
      element.className = className ? className : "";
      element.innerHTML = innerHTML ? innerHTML : "";

      return element;
    },
    createIntroSkillColumn(skill) {
      console.log(skill);
      let column = this.createElement(
        "div", 
        "col-12 col-sm-4 mb-5",
      );

      let icon = this.createElement(
        "i", 
        "fa fa-4x col-12 col-sm-4 gray " + skill.iconCls,
      );

      let title = this.createElement(
        "h4", 
        "mb-5 mt-5", 
        skill.title 
      )

      let description = document.createElement(
        "h6",
        "m-3",
        skill.description
      )

      let skillList = this.createElement(
        "ul",
        "skills"
      );
      skill.skills.forEach((skill) => {
        let skillBullet = this.createElement("li", null, skill);
        skillList.append(skillBullet);
      });

      column.append(icon);
      column.append(title);
      column.append(description);
      column.append(skillList);

      return column
    },
    createProjectSkillButton(iconClass, innerHTML, active) {
      let button = document.createElement("button");
      let icon = document.createElement("i");

      button.type = "button";
      button.id = innerHTML;
      button.className = active? "skill btn selected" : "skill btn";
      button.innerHTML = " " + innerHTML;
      button.onclick = () => {
        display.filterCards(innerHTML);
      };

      icon.className = iconClass;

      button.prepend(icon);

      return button;
    },
    renderProjects() {
      let projectsRow = this.createRow();
      for(i=0; i<projectsData.projects.length; i++) {
        let project = projectsData.projects[i];
        let projectCard = display.createCard(project.thumb, project.name, project.skillTag, project.desc, i);
        projectsRow.append(projectCard);
      }

      $("#projects").append(projectsRow);

    },
    createRow() {
      let row = document.createElement("div");
      row.className = "row row content col";
      return row;
    },
    openModal(projIndex) {
      let project = projectsData.projects[projIndex];

      $(".modal-title").html(project.name);
      $('.carousel-item').remove();

      for(i=0; i<project.images.length; i++) {
        let image = document.createElement("img");
        image.className = "img-fluid";
        image.src = project.images[i] ;

        let caption = document.createElement("p");
        caption.innerHTML = project.captions[i];

        let captionDiv = document.createElement("div");
        captionDiv.className = "carousel-caption";

        captionDiv.append(caption);

        let carouselItem = document.createElement("div");
        carouselItem.className = (i===0)? "carousel-item active" : "carousel-item";

        carouselItem.append(image, captionDiv);

        $(".carousel-inner").append(carouselItem);
      }

      $("#projectModal").modal('show');

    },
    createCard(projectThumb, projectTitle, skillTagData, projectDesc, index) {
      let card = document.createElement("div");
      card.className = "project card col-6 col-sm-4 col-md-3";
      card.onclick = () => {
        display.openModal(index);
      }

      let thumb = document.createElement("img");
      thumb.className = "card-img";
      thumb.src = projectThumb;

      let overlay = document.createElement("div");
      overlay.className = "card-img-overlay";

      let title = document.createElement("h6");
      title.className = "card-title";
      title.innerHTML = projectTitle;

      let skillTagGroup = document.createElement("div");
      skillTagGroup.className = "skill-tags";

      skillTagData.forEach((skill) => {
        let skillTag = display.createSkillTag(skill);
        skillTagGroup.className = "d-none d-lg-block";
        skillTagGroup.append(skillTag);
      });

      let description = document.createElement("small");
      description.className = "card-text d-none d-lg-block";
      description.innerHTML = projectDesc;

      overlay.append(title, skillTagGroup, description);

      card.append(thumb, overlay);

      return card;
    },
    createSkillTag(skill) {
      let skillTag = document.createElement("button");
      skillTag.type = "button";
      skillTag.className = "skillTag disabled " + skill
      skillTag.innerHTML = skill;

      return skillTag;
    },
    filterCards(skill) {
      let selectedSkillButton = document.getElementById(skill);
      if(selectedSkillButton.classList.contains("selected")){
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

    renderModal() {
      for(let i = 0; i < projectsData.projects.length; i++)
      {
        let modalID = "modal" + i;

        let formattedModalstart = HTMLmodalStart.replace(/%modal%/g, modalID);
        $("#projects").append(formattedModalstart);

        let modalImageLength = projectsData.projects[i].images.length;
        for (let a = 0; a < modalImageLength; a++) {
          let slideNo = a+1 + "/" + modalImageLength;
          let formattedModalslide = HTMLmodalSlide.replace("%page%",slideNo).replace("%data%",projectsData.projects[i].images[a]);
          $(".modal-content:last").append(formattedModalslide);
        }

        let formattedArrows = HTMLmodalArrows.replace(/%modal%/g, modalID);
        $(".modal-content:last").append(formattedArrows, HTMLmodalCaption);

        for (let b = 0; b < modalImageLength; b++) {
          let formattedModalcolumn = HTMLmodalColumn.replace("%data%", projectsData.projects[i].images[b]).replace("%slideNo%", b+1).replace("%modal%", modalID).replace("%content%", projectsData.projects[i].captions[b]);
          $(".modal-content:last").append(formattedModalcolumn);
        }

      }
    }

  }


display.init();

});
