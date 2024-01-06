let livObj;
let liveryPanelInit = document.getElementById("liveryPanel");
let liveryPanelML = document.createElement("div");
let isValidClient = false;
liveryPanelML.id = "liveryPanelML";
liveryPanelML.className = "liveryPanelML";

 async function fetchLiv() {await fetch("https://raw.githubusercontent.com/Spice9/Geofs-Multiliveries/main/dependencies/liveries.json")
 .then(res => res.json())
 .then(data => livObj = data) 
 .then(function(){appendLiveries()})
  }
fetchLiv();

function resetPanel() {
  liveryPanelML.innerHTML = `
  <h2 style="text-align: center;";>Liveries:</h2>
  `
}

resetPanel();
liveryPanelInit.style.display = "flex";
liveryPanelInit.append(liveryPanelML);


function initiateSearch(type) {
  if (type == 'airline') {
    Object.values(document.getElementsByClassName("airframeButtons")).forEach(function(e) {
      e.style.display = "none";
    })
    document.getElementById("trueSearchBar").style.display = "inline";
  }
  if (type == 'airframe') {
    document.getElementById("trueSearchBar").style.display = "none";
    Object.values(document.getElementsByClassName("airframeButtons")).forEach(function(e) {
      e.style.display = "flex";
    })
  }
}



function appendLiveries() {
  try {
  livObj.aircraft.forEach(function(e){
    var image = e.mptx;
    var liveryMessage = ""
    if (e.hasOwnProperty("pbrComposite")) {
      liveryMessage = e.livery + "|" + e.pbrComposite + "|" + e.normalMap;
    } else {
      liveryMessage = e.livery;
    }
    var onclickevent = `window.opener.postMessage('${liveryMessage}', ${"'" + "*" + "'"});`
      var currentObject = document.createElement("div")
      currentObject.innerHTML = `<div class="livGallery" onclick="${onclickevent}"><a target="_blank" >
    <img src="${image}" alt="Cinque Terre" width="600" height="400">
  </a>
    <div class="livDesc">${e.name}</div>
  </div>`
    var target = document.getElementById("liveryPanelML");
    target.appendChild(currentObject);
    })
  }
  catch(error) {
    console.log(error);
  }
}

function appendSearchLiveries(arr) {
  toggleLiveryPanel();
  try {
    var target = document.getElementById("liveryPanelML");
    target.innerHTML = "";
  arr.forEach(function(e){
    var image = e.mptx;
    var onclickevent = `window.opener.postMessage('${e.livery}', ${"'" + "*" + "'"});`
      var currentObject = document.createElement("div")
      currentObject.innerHTML = `<div class="livGallery" onclick="${onclickevent}"><a target="_blank" >
    <img src="${image}" alt="Cinque Terre" width="600" height="400">
  </a>
    <div class="livDesc">${e.name}</div>
  </div>`
    
    target.appendChild(currentObject);
    
    })
  }
  catch(error) {
    console.log(error);
  }
  
}

function getAirframes(airframe) {
  
}

function isHidden(el) {
    return (el.offsetParent === null)
}

function hideAll() {
  var panel = document.getElementById("liveryPanel");
  var panel1 = document.getElementById("searchBar");
  var panel2 = document.getElementById("creditsPanel");
  var panel3 = document.getElementById("importPanel");
    panel.style.display = "none";
    panel1.style.display = "none";
    panel2.style.display = "none";
    panel3.style.display = "none";

}

function hideOthers(current) {
  var panel = document.getElementById("liveryPanel");
  var panel1 = document.getElementById("searchBar");
  var panel2 = document.getElementById("creditsPanel");
  var panel3 = document.getElementById("importPanel");

  if (current == 0) {
    panel1.style.display = "none";
    panel2.style.display = "none";
    panel3.style.display = "none";
  }
  if (current == 1) {
    panel.style.display = "none";
    panel2.style.display = "none";
    panel3.style.display = "none";
  }
  if (current == 2) {
    panel.style.display = "none";
    panel1.style.display = "none";
    panel3.style.display = "none";
  }
  if (current == 3) {
    panel.style.display = "none";
    panel1.style.display = "none";
    panel2.style.display = "none";
  }
}

function toggleLiveryPanel() {
  var panel = document.getElementById("liveryPanel");
  hideOthers(0);
  if (isHidden(panel)) {
    panel.style.display = "inline";
  } else {
    panel.style.display = "none";
  }
}

function toggleSearchPanel() {
  var panel = document.getElementById("searchBar");
  hideOthers(1);
  if (isHidden(panel)) {
    panel.style.display = "inline";
  } else {
    panel.style.display = "none";
  }
}

function toggleCreditsPanel() {
  var panel = document.getElementById("creditsPanel");
  hideOthers(2);
  if (isHidden(panel)) {
    panel.style.display = "inline";
  } else {
    panel.style.display = "none";
  }
}

function toggleUploadPanel() {
  var panel = document.getElementById("importPanel");
  hideOthers(3);
  if (isHidden(panel)) {
    panel.style.display = "inline";
  } else {
    panel.style.display = "none";
  }
}


var searchModal = document.getElementById("searchBar");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  searchModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == searchModal) {
    searchModal.style.display = "none";
  }
}

function doSearch() {
  var result = [];
  var query = document.getElementById("query").value;
    livObj.aircraft.forEach(function(e) {
      if(typeof e.name === "string") {
        if (e.name.toString().toLowerCase().includes(query.toLowerCase())) {
          result.push(e);
        }
      }
    })
  console.log(result)
  searchModal.style.display = "none";
  appendSearchLiveries(result);
};

function doAirframeSearch(airframe) {
  var result = [];
    livObj.aircraft.forEach(function(e) {
      if(typeof e.name === "string") {
        if (e.name.toString().toLowerCase().includes(airframe.toLowerCase())) {
          result.push(e);
        }
      }
    })
  console.log(result)
  searchModal.style.display = "none";
  appendSearchLiveries(result);
}

document.getElementById("importSubmit").addEventListener("click", function() {
  isValidClient = false;
  var customUrl = document.getElementById("importUrl").value;
   window.opener.postMessage(customUrl + "?custom", "*");
  setTimeout(function() {if (!isValidClient) {window.opener.postMessage("inv", "*"); window.opener.postMessage(1, "*");}}, 100)
});

hideAll()
let runs = 0
window.addEventListener('message', (e) => {
  if (e.data === "valid") {
    console.log(e.data);
    isValidClient = true;
  }
});
