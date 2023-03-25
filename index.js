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
        listItem.className = "list-group-item";
        listItem.id = "jogador";

        let node = document.createTextNode(jogador);

        listItem.appendChild(node);

        let ul = document.querySelector("#players-list");
        ul.appendChild(listItem);
    });

    document.querySelectorAll("#jogador").forEach(item => item.addEventListener("click", event => {
        item.remove();
        let totalJogadores = parseInt(document.getElementById("total-jogadores").innerHTML) - 1;
        document.getElementById("total-jogadores").innerHTML = totalJogadores;
    }))

    let totalJogadores = parseInt(document.getElementById("total-jogadores").innerHTML) + listaJogadores.length;
    document.getElementById("total-jogadores").innerHTML = totalJogadores;
}

function check() {
    if(document.querySelector("#floatingTextarea").value==="") { 
           document.querySelector("#btn-add").disabled = true; 
       } else { 
           document.querySelector("#btn-add").disabled = false;
       }
   }

function showTeams(teams) {

    document.querySelector("#accordionPanelsStayOpenExample").innerHTML = "";
    document.getElementById("times").style.display = "block";
    

    for (let i = 0; i<teams.size; i++) {


        let title = document.createElement("h2");
        title.className = "accordion-header";
        title.id = "panelsStayOpen-headingOne";

        let button = document.createElement("button");
        button.setAttribute("class", "accordion-button");
        button.setAttribute("type", "button");
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute("data-bs-target", "#panelsStayOpen-collapseOne");
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-controls", "panelsStayOpen-collapseOne");


        let buttonNode = document.createTextNode(`Time ${i + 1}`)

        button.appendChild(buttonNode);
        title.appendChild(button);

        let body = document.createElement("div");
        body.setAttribute("id", "panelsStayOpen-collapseOne");
        body.setAttribute("class", "accordion-collapse collapse show");
        body.setAttribute("aria-labelledby" , "panelsStayOpen-headingOne");

        let ul = document.createElement("ul");
        ul.setAttribute("class", "list-group");
        ul.setAttribute("id", "players-list-created");

        teams.get(i+1).forEach(jogador => {
            let li = document.createElement("li");
            li.setAttribute("class", "list-group-item");
            let nomeJogador = document.createTextNode(jogador);
            li.appendChild(nomeJogador);
            ul.appendChild(li);
        })

        body.appendChild(ul);

        let accordionItem = document.createElement("div");
        accordionItem.setAttribute("class", "accordion-item")
        accordionItem.appendChild(title);
        accordionItem.appendChild(body);

        document.querySelector("#accordionPanelsStayOpenExample").appendChild(accordionItem);

        
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