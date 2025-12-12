let taches = JSON.parse(localStorage.getItem('taches')) || [];
let pageActuelle = 1;
const tachesParPage = 5;

function sauvegarder() {
  localStorage.setItem('taches', JSON.stringify(taches));
}

function ajouterTache(nom) {
  if (nom.trim() === "") {
    alert("Veuillez entrer une tâche !");
    return;
  }
  taches.push({ nom, done: false });
  sauvegarder();
  pageActuelle = Math.ceil(taches.length / tachesParPage); 
  afficherTaches();
}

function supprimerTache(index) {
  taches.splice(index, 1);
  sauvegarder();
  const maxPage = Math.ceil(taches.length / tachesParPage);
  if (pageActuelle > maxPage) pageActuelle = maxPage || 1;
  afficherTaches();
}

function modifierTache(index) {
  const nouveau = prompt("Modifier la tâche :", taches[index].nom);
  if (nouveau && nouveau.trim() !== "") {
    taches[index].nom = nouveau;
    sauvegarder();
    afficherTaches();
  }
}

function toggleTerminee(index) {
  taches[index].done = !taches[index].done;
  sauvegarder();
  afficherTaches();
}

function afficherTaches() {
  const liste = document.getElementById("listeTaches");
  liste.innerHTML = "";

  const start = (pageActuelle - 1) * tachesParPage;
  const end = start + tachesParPage;
  const pageTaches = taches.slice(start, end);

  pageTaches.forEach((tache, i) => {
    const indexGlobal = start + i;
    const ligne = document.createElement("tr");
    ligne.innerHTML = `
      <td>${indexGlobal + 1}</td>
      <td class="${tache.done ? "tache-terminee" : ""}">${tache.nom}</td>
      <td>
        <button class="btn btn-success btn-sm me-1" onclick="toggleTerminee(${indexGlobal})">✔️</button>
        <button class="btn btn-warning btn-sm me-1" onclick="modifierTache(${indexGlobal})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="supprimerTache(${indexGlobal})">🗑️</button>
      </td>
    `;
    liste.appendChild(ligne);
  });

  document.getElementById("pageInfo").textContent =
    `Page ${pageActuelle} / ${Math.max(1, Math.ceil(taches.length / tachesParPage))}`;
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (pageActuelle > 1) {
    pageActuelle--;
    afficherTaches();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  if (pageActuelle < Math.ceil(taches.length / tachesParPage)) {
    pageActuelle++;
    afficherTaches();
  }
});

document.getElementById("ajouterBtn").addEventListener("click", () => {
  const input = document.getElementById("tacheInput");
  ajouterTache(input.value);
  input.value = "";
});

document.getElementById("tacheInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    ajouterTache(e.target.value);
    e.target.value = "";
  }
});

afficherTaches();
