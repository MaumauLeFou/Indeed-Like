function toggleMenu() {
  const slidingMenu = document.querySelector(".sliding-menu");
  if (slidingMenu.style.left === "-250px") {
    slidingMenu.style.left = "0";
  } else {
    slidingMenu.style.left = "-250px";
  }
}

function showDetails(btn) {
  const parent = btn.parentNode;
  const details = parent.querySelector(".details");
  const annonces = document.querySelectorAll(".annonce");
  if (details.classList.contains("active")) {
    // Masquer les détails
    details.classList.remove("active");
    parent.classList.remove("open");
    // Rétablir la largeur par défaut de toutes les annonces
    annonces.forEach((annonce) => {
      annonce.style.width = "calc(100% - 40px)";
    });
  } else {
    // Afficher les détails
    const otherDetails = document.querySelectorAll(".details");
    otherDetails.forEach((item) => {
      item.classList.remove("active");
    });
    details.classList.add("active");
    parent.classList.add("open");
    // Réduire la largeur de toutes les annonces à 33.33%
    annonces.forEach((annonce) => {
      annonce.style.width = "33.33%";
    });
  }
}

function showApplicationForm() {
  var modal = document.getElementById("applicationModal");
  modal.style.display = "block";
}

function closeApplicationForm() {
  var modal = document.getElementById("applicationModal");
  modal.style.display = "none";
}
