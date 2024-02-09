
/** Datos */
let datosJSON = `[
    {
      "title": "Monkey Island Theme",
      "artist": "Michael Land",
      "url": "https://scummbar.com/mi2/MI1-CD/01%20-%20Opening%20Themes%20-%20Introduction.mp3",
      "image": "monkey.jpg"
    },
    {
      "title": "The SCUMM Bar",
      "artist": "Michael Land",
      "url": "https://scummbar.com/mi2/MI1-CD/03%20-%20The%20Scumm%20Bar.mp3",
      "image": "scummbar.jpg"
    },
    {
      "title": "LeChuck's Theme",
      "artist": "Michael Land",
      "url": "https://scummbar.com/mi2/MI1-CD/04%20-%20LeChuck's%20Theme.mp3",
      "image": "lechuck.jpg"
    },
    {
      "title": "Monkey Island (Remix)",
      "artist": "Michael Land",
      "url": "https://scummbar.com/mi2/MI1-CD/26%20-%20Monkey%20Island%20-%20Rock%20Remix%202.mp3",
      "image": "monkey-mix.jpg"
    }
]`;

/** Elementos */
let reproduciendo = Boolean;
let music = JSON.parse(datosJSON);
let audio = document.createElement("audio");
audio.src = music[0].url;
// audio.controls = true;
let panel = document.getElementById("panelControl")
panel.appendChild(audio)
// audio.play()

/* Enviar canciones al DOM */
let lista = document.getElementById("listaCanciones");
for (let i = 0; i < music.length; i++) {
    let cancionAAgregar = document.createElement("div")
    cancionAAgregar.className = "cancion";
    cancionAAgregar.innerHTML = `<p> ${i+1}. ${music[i].artist} - ${music[i].title}</p>
                                <hr>`

    lista.appendChild(cancionAAgregar);
}

/** Función toggle lista  */
let listBoton = document.getElementById("botonList");
let abierta = false;

listBoton.addEventListener("click", () => {
    if(abierta) {
        lista.style = "left: 0;"
        abierta = false; 
        return
    };
    lista.style = "left: 100%;"
    abierta = true;
})

/* Funcion Play */

let playBoton = document.getElementById("play");
playBoton.addEventListener("click", () => play())
function play() {
    if(reproduciendo) {
        audio.pause()
        reproduciendo = false; 
        return
    };
    audio.play()
    reproduciendo = true;
}
