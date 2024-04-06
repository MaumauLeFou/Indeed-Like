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

function filterAnnonces() {
  const searchInput = document.getElementById("search");
  const searchValue = searchInput.value.toUpperCase();
  const annonces = document.querySelectorAll(".annonce");

  for (let i = 0; i < annonces.length; i++) {
    const annonce = annonces[i];
    const titre = annonce.querySelector("h2").textContent.toUpperCase();
    if (titre.indexOf(searchValue) > -1) {
      annonce.style.display = "";
    } else {
      annonce.style.display = "none";
    }
  }
}

function showDetails(event) {
  const btn = event.currentTarget;
  const parent = btn.parentNode;
  const details = parent.querySelectorAll(".details");
  details.forEach((detail) => {
    if (detail.style.display === "none") {
      detail.style.display = "block";
      btn.textContent = "Masquer les détails"; // Ajoutez cette ligne
    } else {
      detail.style.display = "none";
      btn.textContent = "En savoir plus"; // Ajoutez cette ligne
    }
  });
}

function showApplicationForm() {
  var modal = document.getElementById("applicationModal");
  modal.style.display = "block";
}

function showToast(event, message) {
  event.preventDefault();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    document.body.removeChild(toast);
  }, 5000);
}

function validateForm() {
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
  const telephone = document.getElementById("telephone").value;
  const cv = document.getElementById("cv").value;
  const lettre_motivation = document.getElementById("lettre_motivation").value;

  if (!prenom || !email || !cv || !lettre_motivation) {
    alert("Veuillez remplir tous les champs requis.");
    return false;
  }

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    alert("Veuillez entrer une adresse e-mail valide.");
    return false;
  }

  return true;
}
