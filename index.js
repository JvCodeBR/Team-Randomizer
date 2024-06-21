let btnGenerate = document.querySelector("#btn-generate");
btnGenerate.addEventListener("click", gerar);

let btnAdd = document.querySelector("#btn-add");
btnAdd.addEventListener("click", add);

document.querySelector("#floatingTextarea").addEventListener("keyup", check);

function gerar() {

    let jogadoresList = new Array;
    document.querySelectorAll("#players-list li").forEach(player => jogadoresList.push(player.innerHTML));

    let teams = new Map;
    let teamNumber = 1;
    let playerCount = 1;
    let playersPerTeam = document.querySelector(".form-select").value;

    shuffle(jogadoresList);
    
    jogadoresList.forEach(jogador => {
        if (playerCount > playersPerTeam) {
            playerCount = 1;
            teamNumber++
        }

        if (teams.has(teamNumber)) {
            teams.get(teamNumber).push(jogador);
        } else {
            teams.set(teamNumber, new Array);
            teams.get(teamNumber).push(jogador);
        }
    
        playerCount++;
    })

    showTeams(teams);
}

function add() {
    let jogadores = document.querySelector("#floatingTextarea");
    let listaJogadores = jogadores.value.trim().split("\n");

    document.querySelector("#floatingTextarea").value = "";
    check();

    listaJogadores.forEach(jogador => {
        let listItem = document.createElement("li");
        listItem.className = "list-group-item item-remove pointer";
        listItem.id = "jogador";

        let node = document.createTextNode(jogador);

        listItem.appendChild(node);

        let ul = document.querySelector("#players-list");
        ul.appendChild(listItem);
    });

    document.querySelectorAll("#jogador").forEach(item => item.addEventListener("click", event => {
        item.remove();
        document.getElementById("total-jogadores").innerHTML = document.querySelector("#players-list").childElementCount;
    }));
    document.getElementById("total-jogadores").innerHTML = document.querySelector("#players-list").childElementCount;
}

function check() {
    if(document.querySelector("#floatingTextarea").value==="") { 
           document.querySelector("#btn-add").disabled = true; 
       } else { 
           document.querySelector("#btn-add").disabled = false;
       }
   }

function showTeams(teams) {

    if (teams.size > 0) {
        clearAccordion();
        let title = document.createElement("h3");
        title.className = "mt-3";
        title.id = "times-title"
        title.innerText = "Times";
        document.getElementById("main").appendChild(title);

        let accordion = document.createElement("div");
        accordion.className = "accordion pb-3";
        accordion.id = "times-accordion";
        document.getElementById("main").appendChild(accordion);

        for (let i = 0; i<teams.size; i++) {
            let item = '<div class="accordion-item">';
            item += '<h2 class="accordion-header">';
            item += `<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#time${i}" aria-expanded="true" aria-controls="time${i}">`;
            item += `Time ${i+1}`;
            item += '</button>';
            item += '</h2>';
            item += `<div id="time${i}" class="accordion-collapse collapse show">`;
            item += '<div class="accordion-body">';
            item += '<ul>';
            teams.get(i+1).forEach(jogador => {
                item += `<li>${jogador}</li>`;
            });
            item += '</ul>';
            item += '</div>';
            item += '</div>';
            item += '</div>';
            accordion.innerHTML += item;
        }
    }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function clearAccordion() {
    let main = document.getElementById("main");
    let title = document.getElementById("times-title");
    let accordion = document.getElementById("times-accordion");

    if (title) main.removeChild(title);
    if (accordion) main.removeChild(accordion);
}