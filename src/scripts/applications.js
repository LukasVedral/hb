const API_URL = "https://script.google.com/macros/s/AKfycbxLnA6k9Mq0lF9F2LJ64_ODqweBSzqXmIc9vqO8WAhK3APYpmc59Ll2fnc2-2sW5iq7pA/exec";

const modal = document.getElementById("signup-modal");
const closeModalBtn = document.getElementById("close-modal");
const submitSignupBtn = document.getElementById("submit-signup");

// Otevření modalu po kliknutí na tlačítko
document.querySelector("#sign-up-btn").addEventListener("click", () => {
  modal.classList.remove("hidden");
});
// Zavření modalu
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
submitSignupBtn.addEventListener("click", async () => {
  const teamName = document.getElementById("teamName").value;
  const category = document.getElementById("category").value;
  const racer1 = document.getElementById("racer1").value;
  const email1 = document.getElementById("email1").value;
  const racer2 = document.getElementById("racer2").value;
  const email2 = document.getElementById("email2").value;
  const password = document.getElementById("password").value;

  if (!teamName || !category || !racer1 || !racer2 || !password) {
    alert("Vyplň všechny povinné údaje");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "add",
      teamName,
      category,
      racer1,
      email1,
      racer2,
      email2,
      password
    }),
  });

  modal.classList.add("hidden");
  fetchTeams();
});


async function fetchTeams() {
  // 1. Zkus zobrazit lokální data hned
  const cached = localStorage.getItem("teams");
  if (cached) {
    renderTable(JSON.parse(cached));
  }

  // 2. Stáhni čerstvá data z Google Sheets
  try {
    const res = await fetch(API_URL);
    const teams = await res.json();
    localStorage.setItem("teams", JSON.stringify(teams));
    renderTable(teams);
  } catch (err) {
    console.error("Chyba při načítání z Google Sheets:", err);
  }
}

function renderTable(teams) {
  const tableBody = document.querySelector("#team-table tbody");
  tableBody.innerHTML = "";
  teams.forEach(team => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td></td>
      <td>${team.teamName}</td>
      <td>${team.category}</td>
      <td>${team.racer1}</td>
      <td>${team.racer2}</td>
      <td><button class="sign-out-btn" data-team="${team.teamName}" data-racer1="${team.racer1}" data-racer2="${team.racer2}">Odhlásit</button></td>
    `;
    tableBody.appendChild(tr);
  });
}



document.querySelector("#team-table").addEventListener("click", async (e) => {
  if (e.target.classList.contains("sign-out-btn")) {
    const teamName = e.target.dataset.team;
    const racer1 = e.target.dataset.racer1;
    const racer2 = e.target.dataset.racer2;
    const password = prompt(`Zadej heslo pro tým "${teamName}":`);
    if (!password) return;

    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "remove", teamName, racer1, racer2, password }),
    });

    const result = await res.json();
    if (result.success) {
      // Odeber z localStorage
      let cached = JSON.parse(localStorage.getItem("teams") || "[]");
      cached = cached.filter(t => !(t.teamName === teamName && t.racer1 === racer1 && t.racer2 === racer2));
      localStorage.setItem("teams", JSON.stringify(cached));

      fetchTeams();
    } else {
      alert(result.message || "Odhlášení se nepodařilo.");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetchTeams();
});