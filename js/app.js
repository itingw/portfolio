$(function() {

  let display = {

    init: function() {
      this.renderSkills();
      this.renderProjects();
      // this.renderModal();
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
      for(i=0; i<projectsData.projects.length; i++) {
        let project = projectsData.projects[i];
        let projectCard = display.createCard(project.thumb, project.name, project.skillTag, project.desc, i);
        projectsRow.append(projectCard);
      }

      $("#work").append(projectsRow);

    },
    createRow: function() {
      let row = document.createElement("div");
      row.className = "row row content col";
      return row;
    },
    openModal: function(projIndex) {
      let project = projectsData.projects[projIndex];

      $(".modal-title").html(project.name);
      $('.carousel-item').remove();
      $('#mycarousel').carousel({ interval: 1000});

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
        console.log(carouselItem.className);

        carouselItem.append(image, captionDiv);

        $(".carousel-inner").append(carouselItem);
      }



      $("#projectModal").modal('show');

    },
    createCard: function(projectThumb, projectTitle, skillTagData, projectDesc, index) {
      let card = document.createElement("div");
      card.className = "project card col-6 col-sm-4 col-md-3";
      card.onclick = function() {
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

    },

    renderModal: function() {
      for(var i = 0; i < projectsData.projects.length; i++)
      {
        var modalID = "modal" + i;

        var formattedModalstart = HTMLmodalStart.replace(/%modal%/g, modalID);
        $("#projects").append(formattedModalstart);

        var modalImageLength = projectsData.projects[i].images.length;
        for (var a = 0; a < modalImageLength; a++) {
          var slideNo = a+1 + "/" + modalImageLength;
          var formattedModalslide = HTMLmodalSlide.replace("%page%",slideNo).replace("%data%",projectsData.projects[i].images[a]);
          $(".modal-content:last").append(formattedModalslide);
        }

        var formattedArrows = HTMLmodalArrows.replace(/%modal%/g, modalID);
        $(".modal-content:last").append(formattedArrows, HTMLmodalCaption);

        for (var b = 0; b < modalImageLength; b++) {
          var formattedModalcolumn = HTMLmodalColumn.replace("%data%", projectsData.projects[i].images[b]).replace("%slideNo%", b+1).replace("%modal%", modalID).replace("%content%", projectsData.projects[i].captions[b]);
          $(".modal-content:last").append(formattedModalcolumn);
        }

      }
    }

  }


display.init();

});
