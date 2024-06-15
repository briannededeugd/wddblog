const background = document.querySelector("#playspace");
const road = document.querySelector("#road");
const car = document.querySelector("#car");
const carImg = document.querySelector("#carimg");
const birdBtn = document.querySelector("input[name=birds]");
const rainBtn = document.querySelector("input[name=rain]");

const prevSongBtn = document.querySelector("#prevsong");
const playMusicBtn = document.querySelector("#playsong");
const playIcon = document.querySelector("#playsong span");
const nextSongBtn = document.querySelector("#nextsong");

const songTitle = document.querySelector("#songtitle");
const songArtist = document.querySelector("#songartist");

const drivingAudio = new Audio("../sounds/rijdendeauto.mp3");
const rainAudio = new Audio("../sounds/regenonweer.mp3");
const birdAudio = new Audio("../sounds/vogeltjes.mp3");

let allEnvironments = document.querySelectorAll(
	".environments > label > input"
);
let allCars = document.querySelectorAll(".cars > label > input");
const environments = {
	snowy: "snowyhills.png",
	starry: "starryhills.png",
	sunset: "sunsethills.png",
};
const roads = {
	snowy: "snowytrees.png",
	starry: "starrytrees.png",
	sunset: "sunsettrees.png",
};
const cars = {
	yellow: "yellowcar.png",
	red: "redcar.png",
	blue: "bluecar.png",
};

// Define driving variable
let index = 0;
let driving = false;
let currentcar;

var songs = [
	"sunrise",
	"passing",
	"maki",
	"lettinggo",
	"mynewlove",
	"ghostduet",
	"bliss",
	"itsjustablur",
	"onteoralake",
	"sakuratrees",
	"sunbreak",
	"bytheriver",
	"itsraining",
	"fortykal",
	"thankyou",
	"areyoulost",
	"aruariandance",
	"strawberrytoast",
];
var artists = {
	sunrise: "mt. fujitive",
	passing: "mommy",
	maki: "Dontcry, Glimlip",
	lettinggo: "H E R B, Kendall Miles",
	mynewlove: "elijah who",
	ghostduet: "Louie Zong",
	bliss: "Jinsang",
	itsjustablur: "Sky.High",
	onteoralake: "Kyle McEvoy, Stan Forebee",
	sakuratrees: "Saib",
	sunbreak: "Sleepy Fish",
	bytheriver: "Gil Wandered",
	itsraining: "Masked Man, potsu",
	fortykal: "jarjarjr",
	thankyou: "_mario",
	areyoulost: "Park Bird",
	aruariandance: "Nujabes",
	strawberrytoast: "Lofi Latte",
};
var songtitles = {
	sunrise: "sunrise",
	passing: "passing",
	maki: "Maki",
	lettinggo: "Letting Go",
	mynewlove: "my new love",
	ghostduet: "Ghost Duet",
	bliss: "Bliss",
	itsjustablur: "It's just a blur",
	onteoralake: "Onteora Lake",
	sakuratrees: "Sakura Trees",
	sunbreak: "Sunbreak",
	bytheriver: "By the River",
	itsraining: "It's Raining",
	fortykal: "Forty Kal",
	thankyou: "thank you",
	areyoulost: "Are You Lost",
	aruariandance: "aruarian dance",
	strawberrytoast: "Strawberry Toast :)",
};

var randomSong = Math.floor(Math.random() * songs.length);
var audio = new Audio();

let playIndex = Math.floor(Math.random() * songs.length);
var muziek = false;

/**============================================
 *               Driving
 *=============================================**/
// Function to toggle driving state
function toggleDriving() {
	if (driving) {
		road.style.animationPlayState = "paused";
		car.style.animationPlayState = "paused";
		driving = false;
		drivingAudio.pause();
	} else {
		if (road.style.animationPlayState == "paused") {
			road.style.animationPlayState = "running";
			car.style.animationPlayState = "running";
		} else {
			road.classList.add("drivingroad");
			car.classList.add("drivingcar");
		}
		drivingAudio.play();
		driving = true;
	}
}

/**============================================
 *               Environments
 *=============================================**/

allEnvironments.forEach((env) => {
	env.addEventListener("change", () => {
		console.log(env.value);
		let backgroundEnv = environments[env.value];
		let roadEnv = roads[env.value];

		background.style.backgroundImage = `url("../images/lofidriver/${backgroundEnv}")`;
		road.style.backgroundImage = `url("../images/lofidriver/${roadEnv}")`;
	});
});

rainBtn.addEventListener("change", () => {
	const rainContainer = document.querySelector("#rain");

	if (rainBtn.checked) {
		// When the checkbox is checked, start raining
		rain = true;
		rainContainer.classList.add("rain");
		rainAudio.play();
	} else {
		// When the checkbox is unchecked, stop raining
		rain = false;
		rainContainer.classList.remove("rain");
		rainAudio.pause();
	}
});

birdBtn.addEventListener("change", () => {
	if (birdBtn.checked) {
		// When the checkbox is checked, start raining
		birds = true;
		birdAudio.play();
	} else {
		// When the checkbox is unchecked, stop raining
		birds = false;
		birdAudio.pause();
	}
});

/**============================================
 *               MUSIC
 *=============================================**/

function radioOn() {
	if (muziek === false) {
		audio.play();
		playIcon.textContent = "pause";
		muziek = true;
	} else {
		audio.pause();
		playIcon.textContent = "play_arrow";
		muziek = false;
	}

	updateSongInfo(playIndex);
}

function nextSong() {
	audio.currentTime = 0;
	playIndex = (playIndex + 1) % songs.length;
	audio.src = "../sounds/songs/" + songs[playIndex] + ".mp3";
	audio.load();
	audio.play().catch((e) => {
		if (e.code === DOMException.ABORT_ERR) {
			return;
		}
		throw e;
	});
	playIcon.textContent = "pause";
	updateSongInfo(playIndex);
}

function updateSongInfo(index) {
	const song = songs[index];
	songTitle.textContent = songtitles[song];
	songArtist.textContent = artists[song];
}

audio.src = "../sounds/songs/" + songs[playIndex] + ".mp3";
updateSongInfo(playIndex);

/**============================================
 *               Cars
 *=============================================**/

allCars.forEach((car) => {
	car.addEventListener("change", () => {
		console.log(car.value);
		let carSrc = cars[car.value];

		carImg.src = `../images/lofidriver/${carSrc}`;
	});
});

/**============================================
 *               Event listeners
 *=============================================**/

// on keydown
background.addEventListener("click", toggleDriving);
playMusicBtn.addEventListener("click", radioOn);
nextSongBtn.addEventListener("click", nextSong);
