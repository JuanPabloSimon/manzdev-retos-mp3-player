
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

/** Variables */
let reproduciendo = false; // utilizado en funcion de reproducir 
let music = JSON.parse(datosJSON); // lista de musica parseada
let abierta = false;  // utilizada en funcion de toggle lista de musica

/* Elementos DOM  */
let nombreCancion = document.querySelector("#titulo"),
    artistaCancion = document.querySelector("#artista"),
    imgCancion = document.querySelector("#cover"),
    mainAudio = document.querySelector("#audio"),
    prevBotton = document.querySelector("#prev"),
    nextBotton = document.querySelector("#next"),
    barraEstado = document.querySelector("#barraEstado"),
    lista = document.getElementById("listaCanciones"),
    listBoton = document.getElementById("botonList"),
    playBoton = document.getElementById("play");


/* Enviar canciones al DOM */
for (let i = 0; i < music.length; i++) {
    let cancionAAgregar = document.createElement("div")
    cancionAAgregar.className = "cancion";
    cancionAAgregar.innerHTML = `<p> ${i+1}. ${music[i].artist} - ${music[i].title}</p>
                                <hr>`

    lista.appendChild(cancionAAgregar);
}

/** Función toggle lista  */

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
playBoton.addEventListener("click", () => play())

function play() {
    if(reproduciendo) {
        audio.pause()
        reproduciendo = false; 
        playBoton.src = "./assets/img/play-svgrepo-com.svg"
        return
    };
    audio.play()
    playBoton.src = "./assets/img/pause-svgrepo-com.svg"
    reproduciendo = true;
}

/**Experimentando xd */


let musicIndex = Math.floor(Math.random() * music.length + 1);

window.addEventListener("load", () => {
    cargarMusica(musicIndex)
})

function cargarMusica(index) {
    nombreCancion.innerHTML = music[index - 1].title;
    artistaCancion.innerHTML = music[index - 1].artist;
    imgCancion.src = `./assets/img/${music[index -1].image}`
    mainAudio.src = `${music[index - 1].url}`
}

function next() {
    musicIndex++;
    musicIndex > music.length ? musicIndex = 1 : musicIndex = musicIndex;
    cargarMusica(musicIndex);
    mainAudio.play();
}
function prev() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = music.length : musicIndex = musicIndex;
    cargarMusica(musicIndex);
    mainAudio.play();
}

prevBotton.addEventListener("click", () => prev())
nextBotton.addEventListener("click", () => next())

mainAudio.addEventListener("timeupdate", (e) => {
    const tiempoActual = e.target.currentTime;
    const duracion = e.target.duration;
    let progreso = (tiempoActual / duracion) * 100;
    barraEstado.style.width = `${progreso}%`;

    let tiemAct = document.querySelector("#tiemAct"),
        durationDom = document.querySelector("#tiemTot");

    mainAudio.addEventListener("loadeddata", () => {
        let mainDuration  = mainAudio.duration;
        let minTotal = Math.floor(mainDuration / 60);
        let segTotal = Math.floor(mainDuration % 60)
        if (segTotal < 10) {
            segTotal = `0${segTotal}`;
        }
        durationDom.innerHTML = `${minTotal}:${segTotal}`;
    })

    let minutoActual = Math.floor(tiempoActual / 60);
    let segActual = Math.floor(tiempoActual % 60);
    if (segActual < 10) {
        segActual = `0${segActual}`
    }
    tiemAct.innerHTML = `${minutoActual}:${segActual}`
})

let areaEstado = document.querySelector(".area-estado")

areaEstado.addEventListener("click", (e) => {
    let progreso = areaEstado.clientWidth;
    let clickedOffSetX = e.offsetX;
    let duracion = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progreso) * duracion;
    mainAudio.play
})
