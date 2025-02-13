const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const smiley = document.getElementById("smiley");
const audio = document.getElementById("audio");
const noSound = document.getElementById("no-sound");
const songTitle = document.getElementById("songTitle");
const smileyArray = ["🥰🌹", "💌", "🌷🌹", "🌹", "🥰", "💕", "💓💝", "✨", "🌸", "💓", "💮", "👉👈", "💝", "😘"];
const audioFiles = [
    "https://mysound.ge/uploads/tracks/621131775_918713962_433313246.mp3",
    "https://cdn1.suno.ai/980a6142-8647-4f4a-8f17-ca9fa0af3795.mp3",
    "https://cdn1.suno.ai/e6bf5177-5732-49cc-86db-d228d5c270fc.mp3",
    "https://cdn1.suno.ai/0fc3626d-2315-4bb8-9601-eb2f09daf2b9.mp3",
    "https://cdn1.suno.ai/9fd07bfb-789a-48d4-81b3-d02afb562e6b.mp3",
    "https://cdn1.suno.ai/8d31995d-7044-4f27-affe-973f6da7b4f3.mp3",
    "https://cdn1.suno.ai/89131365-39e1-4088-bd89-27ba343e3284.mp3",
    "https://cdn1.suno.ai/ac84d3c2-d901-4786-8675-306b9761ef6d.mp3",
    "https://cdn1.suno.ai/fb1211a9-63c6-4880-8ea5-22a28f2b0a9f.mp3"
];

const songNames = [
    "1 - Careless Whisper",
    "2 - She Got Me Now",
    "3 - Oh My Lord I'd Die For Ya",
    "4 - Viktoria (But I Dont Like Her Smokeless Cigarettes)",
    "5 - I've Always Adored Ya",
    "6 - Vicky Is So Fire",
    "7 - Echoes In The night",
    "8 - She My Viktoria",
    "9 - Stole My Mind"
];

let heartRainInterval;
let heartRainActive = false;
let smileyInterval;
let smileys = [];
noSound.volume = 0.15;
audio.volume = 0.3;
let currentAudioIndex = 0;
let isPlaying = false;

function placeNoButton() {
    let x, y;
    let safeDistance = 150; // Minimum distance from YES button
    let maxAttempts = 100; // Prevent infinite loops
    let attempts = 0;

    do {
        x = Math.random() * (window.innerWidth - 100); // Random x position
        y = Math.random() * (window.innerHeight - 50); // Random y position

        let yesRect = yesBtn.getBoundingClientRect();
        let distance = Math.sqrt(
            Math.pow(x - yesRect.left, 2) + Math.pow(y - yesRect.top, 2)
        );

        if (distance > safeDistance) {
            break;
        }
        attempts++;
    } while (attempts < maxAttempts);

    x = Math.min(Math.max(x, 0), window.innerWidth - 100);
    y = Math.min(Math.max(y, 0), window.innerHeight - 150);

    if (y > window.innerHeight - 50) {
        y = window.innerHeight - 100;
    }

    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}
placeNoButton();
noBtn.addEventListener("mouseenter", placeNoButton);
noBtn.addEventListener("click", placeNoButton);
noBtn.addEventListener("mouseenter", () => {
    noSound.play(); // Play sound on hover
});

noBtn.addEventListener("click", () => {
    noSound.play(); // Play sound on click
});

function playNextAudio() {
    audio.src = audioFiles[currentAudioIndex];
    songTitle.textContent = `Now Playing: ${songNames[currentAudioIndex]}`;
    audio.volume = 0.3;
    audio.play();
    currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length; // Move to next track for next click
};

yesBtn.addEventListener("click", () => {
    detail.classList.remove("hidden");

    if (isPlaying) {
        // If audio is playing, pause it
        audio.pause();
        songTitle.textContent = "";
    } else {
        // If audio is paused, load and play the next track
        playNextAudio();
    }

    // Toggle the play state
    isPlaying = !isPlaying;


    yesBtn.classList.add("rotated");

    setTimeout(() => {
        yesBtn.classList.remove("rotated");
    }, 1000); // Remove the class after the animation duration (1 second)

    // Trigger confetti animation
    createConfetti();

    // Remove all previous smileys
    smileys.forEach(smiley => {
        smiley.remove();
    });
    smileys = [];  // Reset the smiley array

    function createSmiley() {
        const newSmiley = document.createElement("div");
        const randomSmiley = smileyArray[Math.floor(Math.random() * smileyArray.length)];
        newSmiley.innerHTML = randomSmiley;
        newSmiley.classList.add("smiley");

        const smileyHeight = 50;
        const smileyWidth = 50;
        const randomY = Math.random() * (window.innerHeight - smileyHeight) - 25;
        const randomX = Math.random() * (window.innerWidth - smileyWidth);

        newSmiley.style.top = `${randomY}px`;
        newSmiley.style.left = `${randomX}px`;
        newSmiley.style.position = "absolute";

        document.body.appendChild(newSmiley);
        smileys.push(newSmiley); // Store the smiley in the array

        // Apply fade-in class for smooth appearance
        setTimeout(() => {
            newSmiley.classList.add("show");
        }, 10);

        // Apply fade-out after a delay and remove the element after fade-out
        setTimeout(() => {
            newSmiley.classList.add("hide");
            setTimeout(() => {
                newSmiley.remove();
            }, 2000); // Wait for fade-out animation to complete before removal
        }, 8000);  // Smiley disappears after 10 seconds
    }

    smileyInterval = setInterval(createSmiley, 750);  // Create a new smiley every 3/4 second

    // Start heart rain after 5s
    setTimeout(startHeartRain, 5000);
});

audio.addEventListener("ended", playNextAudio);

function createConfetti() {
    const confettiCount = 30; // Number of confetti particles
    const buttonRect = yesBtn.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    // Color array for confetti
    const colors = [
        '#ff4081', '#ff7eb3', '#ff3d68', '#36cfc9', '#ffbb33', '#f5222d', '#52c41a', '#13c2c2', '#722ed1'
    ];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        // Randomly generate directions and sizes for each confetti
        const angle = Math.random() * 360;
        const distance = Math.random() * 200 + 100;
        const confettiX = Math.cos(angle) * distance;
        const confettiY = Math.sin(angle) * distance;

        // Set custom CSS properties for translation values to animate outwards
        confetti.style.setProperty('--x', `${confettiX}px`);
        confetti.style.setProperty('--y', `${confettiY}px`);

        // Randomize the confetti color
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = randomColor;

        // Position confetti at the button's center
        confetti.style.top = `${buttonCenterY}px`;
        confetti.style.left = `${buttonCenterX}px`;

        document.body.appendChild(confetti);

        // Remove confetti after animation ends
        setTimeout(() => {
            confetti.remove();
        }, 1000); // Remove confetti after animation duration
    }
}

function startHeartRain() {
    if (heartRainActive) return;

    heartRainActive = true;

    let rainDuration = 10000; // Duration for heart rain to last
    let rainInterval = setInterval(createHeart, 200); // Create a new heart every 200ms

    setTimeout(() => {
        clearInterval(rainInterval);
        heartRainActive = false;
    }, rainDuration);
}

function createHeart() {
    const newHeart = document.createElement("div");
    newHeart.innerHTML = "❤️";
    newHeart.classList.add("heart");

    const maxX = window.innerWidth - 50;
    const randomX = Math.random() * maxX;
    const startY = -50;

    newHeart.style.top = `${startY}px`;
    newHeart.style.left = `${randomX}px`;
    newHeart.style.position = "absolute";

    document.body.appendChild(newHeart);

    setTimeout(() => {
        newHeart.classList.add("falling");
    }, 10);

    setTimeout(() => {
        newHeart.classList.add("hide");
        setTimeout(() => {
            newHeart.remove();
        }, 2000);  // Fade-out time for hearts
    }, 5000);  // Heart stays on screen for 5 seconds before disappearing
}

window.onload = placeNoButton;
