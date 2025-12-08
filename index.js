let taches = JSON.parse(localStorage.getItem('taches')) || [];

function sauvegarder() {
  localStorage.setItem('taches', JSON.stringify(taches));
}

function ajouterTache(nom) {
  if (nom.trim() === "") {
    alert("Veuillez entrer une tâche !");
    return;
  }
  taches.push(nom);
  sauvegarder();
  afficherTaches();
}

function supprimerTache(index) {
  taches.splice(index, 1);
  sauvegarder();
  afficherTaches();
}

function afficherTaches() {
  const liste = document.getElementById("listeTaches");
  liste.innerHTML = "";

  taches.forEach((tache, index) => {
    const ligne = document.createElement("tr");
    ligne.innerHTML = `
      <td>${index + 1}</td>
      <td>${tache}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="supprimerTache(${index})">🗑</button>
      </td>
    `;
    liste.appendChild(ligne);
  });
}

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