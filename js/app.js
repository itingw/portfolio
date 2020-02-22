$(function() {

  let display = {

    init: function() {
      this.renderSkills();
      this.renderProjects();

    },

    renderSkills: function() {
      let skillsRow = this.createRow();

      let allButton = this.createSkillButton("fas fa-asterisk", " see all", true);
      skillsRow.append(allButton);

      skillsData.skills.forEach(function(skill) {
        let skillButton = display.createSkillButton(skill.icon, skill.name, false);
        skillsRow.append(skillButton);
      });

      $('#work').append(skillsRow);

    },
    createSkillButton: function(iconClass, innerHTML, active) {
      let button = document.createElement("button");
      let icon = document.createElement("i");

      button.type = "button";
      button.id = innerHTML;
      button.className = active? "skill btn selected" : "skill btn";
      button.innerHTML = " " + innerHTML;
      button.onclick = function() {
        display.filterCards(innerHTML);
      };

      icon.className = iconClass;

      button.prepend(icon);

      return button;
    },
    renderProjects: function() {
      let projectsRow = this.createRow();
      projectsData.projects.forEach(function(project) {
        let projectCard = display.createCard(project.thumb, project.name, project.skillTag, project.desc);
        projectsRow.append(projectCard);
      });

      $("#work").append(projectsRow);

    },
    createRow: function() {
      let row = document.createElement("div");
      row.className = "row row content col";
      return row;
    },
    createCard: function(projectThumb, projectTitle, skillTagData, projectDesc) {
      let card = document.createElement("div");
      card.className = "project card col-6 col-sm-4 col-md-3";

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

      skillTagData.forEach(function(skill) {
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
    createSkillTag: function(skill) {
      let skillTag = document.createElement("button");
      skillTag.type = "button";
      skillTag.className = "skillTag disabled " + skill
      skillTag.innerHTML = skill;

      return skillTag;
    },
    filterCards: function(skill) {
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

    }

  }


display.init();

});
