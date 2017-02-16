function getAJoke() {
  var req = new XMLHttpRequest();
  req.addEventListener('load', handleResponse);
  req.open('GET', '/api/chuck/random');
  req.send();
}

function setJoke(joke) {
  window.document.getElementById('chuck-joke').innerHTML = joke;
}

function setGif(gifUrl) {
  window.document.getElementById('chuck-gif').src = gifUrl;
}

function handleResponse() {
  var response = JSON.parse(this.responseText);
  setJoke(response.joke);
  setGif(response.gif);
}

function init() {
  getAJoke();
}

init();