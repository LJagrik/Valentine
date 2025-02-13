const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const smiley = document.getElementById("smiley");
const audio = document.getElementById("audio");
const noSound = document.getElementById("no-sound");
const smileyArray = ["🥰🌹", "💌", "🌷🌹", "🌹", "🥰", "💕", "💓💝", "✨", "🌸"];

let heartRainInterval;
let heartRainActive = false;
let smileyInterval;

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

noBtn.addEventListener("mouseenter", placeNoButton);
noBtn.addEventListener("click", placeNoButton);
noBtn.addEventListener("mouseenter", () => {
    noSound.play(); // Play sound on hover
});

noBtn.addEventListener("click", () => {
    noSound.play(); // Play sound on click
});

yesBtn.addEventListener("click", () => {
    smiley.classList.remove("hidden");

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    function createSmiley() {
        const newSmiley = document.createElement("div");
        const randomSmiley = smileyArray[Math.floor(Math.random() * smileyArray.length)];
        newSmiley.innerHTML = randomSmiley;
        newSmiley.classList.add("smiley");

        const smileyHeight = 50;
        const smileyWidth = 50;
        const randomY = Math.random() * (window.innerHeight - smileyHeight);
        const randomX = Math.random() * (window.innerWidth - smileyWidth);

        newSmiley.style.top = `${randomY}px`;
        newSmiley.style.left = `${randomX}px`;
        newSmiley.style.position = "absolute";

        document.body.appendChild(newSmiley);

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
        }, 10000);  // Smiley disappears after 10 seconds
    }

    smileyInterval = setInterval(createSmiley, 750);  // Create a new smiley every 3/4 second

    // Start heart rain after 5s
    setTimeout(startHeartRain, 5000);
});

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
