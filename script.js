const mainContainer = document.getElementById('main-container');
const toolsContainer = document.getElementById('tools');
const teamContainer = document.getElementById('teams-container');
const tempTeams = document.getElementsByClassName('temp-team');
const search = document.getElementById('search');
const notification = document.getElementById('notification');

let teams = [];

// Create initial placeholder team divs
function initBlanks() {
  for (let i = 0; i < 11; i++) {
    let tempBlankEl = document.createElement('div');
    let tempCol1 = createRandomColour();
    let tempCol2 = createRandomColour();
    tempBlankEl.classList.add('temp-team');
    tempBlankEl.classList.add('team');

    tempBlankEl.innerHTML = `
        <div class="team-names">
            <h3>██████ ██</h3>
            <h4>███ ██████ ████</h4>
        </div>
        <div class="team-colours">
            <p class="team-colour" style="background-color: ${tempCol1}">${tempCol1}</p>
            <p class="team-colour" style="background-color: ${tempCol2}">${tempCol2}</p>
        </div>
    `;
    teamContainer.appendChild(tempBlankEl);
  }
}

// Fetch & Process json into team divs
function initTeams() {
  fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      teams = data;
      populateTeams(data.slice(0, 250));
    });
}

initBlanks();
initTeams();

// Search teams
function searchTeams(e) {
  e.preventDefault();
  tempData = [];
  for (var i = 0; i < teams.length; i++) {
    if (
      teams[i].TeamShort.toLowerCase().includes(e.target.value.toLowerCase()) |
      teams[i].TeamLong.toLowerCase().includes(e.target.value.toLowerCase())
    ) {
      tempData.push(teams[i]);
    }
  }
  populateTeams(tempData.slice(0, 250));
}

// Process data
function populateTeams(data) {
  let teams = document.getElementsByClassName('team');
  while (teams[0]) {
    teams[0].parentNode.removeChild(teams[0]);
  }

  data.forEach((team) => {
    tempTeamEl = document.createElement('div');
    tempTeamEl.classList.add('team');
    tempTeamEl.innerHTML = `
  <div class="team-names">
    <h3>${team.TeamShort}</h3>
    <h4>${team.TeamLong}</h4>
  </div>
  <div class="team-colours">
    ${team.TeamColours.map(
      (colour) =>
        `<p class='team-colour' style="background-color:${colour}; border: 1px solid ${colourDarkness(
          colour
        )}; color: ${colourDarkness(
          colour
        )}"><span>${colour.toUpperCase()}</span></p>`
    ).join('')}
  </div>`;
    teamContainer.appendChild(tempTeamEl);
  });
  while (tempTeams[0]) {
    tempTeams[0].parentNode.removeChild(tempTeams[0]);
  }

  var teamCols = document.getElementsByClassName('team-colour');

  for (var i = 0; i < teamCols.length; i++) {
    teamCols[i].addEventListener('click', copyText);
  }
}

// Create random colour code
function createRandomColour() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Decide if colour is light or dark and return white or black
function colourDarkness(colour) {
  let returnColour = '';
  let red = parseInt(colour.slice(1, 3), 16);
  let blue = parseInt(colour.slice(3, 5), 16);
  let green = parseInt(colour.slice(5, 7), 16);

  let yellows = [
    '#FFFF00',
    '#FDF105',
    '#FFED00',
    '#fffb00',
    '#ffee00',
    '#f7ea36',
    '#f0e913',
    '#FAE60F',
    '#ffdd00',
    '#fcfc19',
    '#FAFA04',
    '#f2e63a',
    '#FFF200',
    '#ffe814',
    '#FFFF14',
    '#FEFE00',
    '#FFFF00',
    '#FFF500',
    '#FFFF33',
    '#FEF000',
    '#FFF700',
    '#FFFF00',
    '#FEFF00',
    '#FFFF00',
    '#FCF803',
  ];

  if (yellows.includes(colour)) {
    returnColour = '#000000';
  } else {
    if (red * 0.299 + green * 0.587 + blue * 0.114 > 189) {
      returnColour = '#000000';
    } else {
      returnColour = '#ffffff';
    }
  }

  return returnColour;
}

// Copy text in div
function copyText(e) {
  let dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = e.target.innerText;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);

  /* Alert the copied text */
  showNotification('Copied: ' + e.target.innerText);
}

// Send notification
function showNotification(text) {
  console.log(text);
  notification.innerHTML = `<p>${text}</p>`;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2500);
}

// Event listeners

submit.addEventListener('submit', searchTeams);
search.addEventListener('input', searchTeams);
