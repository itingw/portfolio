$(function() {
  console.log("view.js");
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
      button.className = active? "btn selected" : "btn";
      button.innerHTML = " " + innerHTML;

      icon.className = iconClass;

      button.prepend(icon);

      return button;
    },
    renderProjects: function() {
      let projectsRow = this.createRow();
      projectsData.projects.forEach(function(project) {
        let projectCard = display.createCard(project.thumb, project.name, project.desc);
        projectsRow.append(projectCard);
      });

      $("#work").append(projectsRow);

    },
    createRow: function() {
      let row = document.createElement("div");
      row.className = "row row content col";
      return row;
    },
    createCard: function(projectThumb, projectTitle, projectDesc) {
      let card = document.createElement("div");
      card.className = "card col-6 col-sm-4 col-md-3";

      let thumb = document.createElement("img");
      thumb.className = "card-img";
      thumb.src = projectThumb;

      let overlay = document.createElement("div");
      overlay.className = "card-img-overlay";

      let title = document.createElement("h5");
      title.className = "card-title";
      title.innerHTML = projectTitle;

      let description = document.createElement("p");
      description.className = "card-text";
      description.innerHTML = projectDesc;

      overlay.append(title, description);

      card.append(thumb, overlay);

      return card;
    }




  }


display.init();




});
