const players = [
  { name: "Joel Embiid", team: "PHI", points: 33.0, rebounds: 10.8, assists: 5.7 },
  { name: "Jalen Brunson", team: "NYK", points: 32.4, rebounds: 3.3, assists: 7.5 },
  { name: "Shai Gilgeous-Alexander", team: "OKC", points: 30.2, rebounds: 7.2, assists: 6.4 },
  { name: "Tyrese Maxey", team: "PHI", points: 29.8, rebounds: 5.2, assists: 6.8 },
  { name: "Donovan Mitchell", team: "CLE", points: 29.6, rebounds: 5.4, assists: 4.7 }
];

const tbody = document.querySelector("#playersTable tbody");
const searchInput = document.getElementById("searchInput");
const teamFilter = document.getElementById("teamFilter");
const darkModeBtn = document.getElementById("darkModeBtn");
const headers = document.querySelectorAll("#playersTable th");

let currentData = [...players];
let currentSortKey = "";
let sortAscending = true;

function populateTeamFilter() {
  const teams = [...new Set(players.map(player => player.team))];
  teams.forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamFilter.appendChild(option);
  });
}

function renderTable(data) {
  tbody.innerHTML = "";

  data.forEach(player => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.team}</td>
      <td>${player.points}</td>
      <td>${player.rebounds}</td>
      <td>${player.assists}</td>
    `;
    tbody.appendChild(row);
  });
}

function filterPlayers() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedTeam = teamFilter.value;

  currentData = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchValue);
    const matchesTeam = selectedTeam === "All" || player.team === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  if (currentSortKey) {
    sortTable(currentSortKey, false);
  } else {
    renderTable(currentData);
  }
}

function sortTable(key, toggleDirection = true) {
  if (toggleDirection) {
    if (currentSortKey === key) {
      sortAscending = !sortAscending;
    } else {
      sortAscending = true;
    }
  }

  currentSortKey = key;

  currentData.sort((a, b) => {
    if (typeof a[key] === "string") {
      return sortAscending
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    }
    return sortAscending ? a[key] - b[key] : b[key] - a[key];
  });

  renderTable(currentData);
}

searchInput.addEventListener("input", filterPlayers);
teamFilter.addEventListener("change", filterPlayers);

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

headers.forEach(header => {
  header.addEventListener("click", () => {
    const key = header.getAttribute("data-key");
    sortTable(key);
  });

  header.addEventListener("mouseover", () => {
    header.classList.add("highlight");
  });

  header.addEventListener("mouseout", () => {
    header.classList.remove("highlight");
  });
});

tbody.addEventListener("click", (event) => {
  const row = event.target.closest("tr");
  if (row) {
    const playerName = row.children[0].textContent;
    alert(`You clicked on ${playerName}`);
  }
});

populateTeamFilter();
renderTable(players);
