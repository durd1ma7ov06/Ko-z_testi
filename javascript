const harfElement = document.getElementById("harf");
const startBtn = document.getElementById("startBtn");
const statusElement = document.getElementById("status");
const countdownElement = document.getElementById("countdown");
const gamePage = document.getElementById("gamePage");
const resultPage = document.getElementById("resultPage");
const resultElement = document.getElementById("result");
const testStatusElement = document.getElementById("testStatus");

let currentLetter = "";
let gameStarted = false;
let fontSize = 6;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let totalAttempts = 15;
let attempts = 0;
let correctAnswers = 0;

function changeLetter() {
    if (attempts >= totalAttempts) {
        endGame();
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * letters.length);
    currentLetter = letters[randomIndex];
    harfElement.innerText = currentLetter;
    harfElement.style.fontSize = fontSize + "rem"; 
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        fontSize = 6;
        attempts = 0;
        correctAnswers = 0;
        statusElement.innerText = "Tayyorgarlik...";
        countdownElement.innerText = "3";
        testStatusElement.style.display = "block";
        startBtn.style.display = "none"; // Boshlash tugmasini yo'qotish

        let countdown = 3;
        const countdownInterval = setInterval(() => {
            if (countdown > 1) {
                countdown--;
                countdownElement.innerText = countdown;
            } else {
                clearInterval(countdownInterval);
                countdownElement.innerText = "BOSHLADIK!";
                setTimeout(() => {
                    countdownElement.innerText = "";
                    statusElement.innerText = "Harfni klaviaturadan bosing!";
                    statusElement.classList.remove("xato", "togri");
                    changeLetter();
                }, 1000);
            }
        }, 1000);
    }
}

document.addEventListener("keydown", (event) => {
    if (!gameStarted) {
        statusElement.innerText = "Iltimos, o'yinni boshlash uchun tugmani bosing!";
        return;
    }

    const pressedKey = event.key.toUpperCase();

    if (letters.includes(pressedKey)) {
        attempts++;

        if (pressedKey === currentLetter) {
            correctAnswers++;
            statusElement.innerHTML = `✅ To'g'ri! Siz <b>${pressedKey}</b> ni bosdingiz.`;
            statusElement.classList.add("togri");

            if (fontSize > 1) {
                fontSize -= 0.5;
            }
        } else {
            statusElement.innerHTML = `❌ Xato! Siz <b>${pressedKey}</b> ni bosdingiz, lekin <b>${currentLetter}</b> kerak edi.`;
            statusElement.classList.add("xato");

            if (fontSize < 10) {
                fontSize += 0.5;
            }
        }

        setTimeout(() => {
            changeLetter();
            statusElement.innerText = "Harfni klaviaturadan bosing!";
            statusElement.classList.remove("xato", "togri");
        }, 1500);
    }
});

function endGame() {
    gameStarted = false;
    let scorePercentage = Math.round((correctAnswers / totalAttempts) * 100);

    // Ko'rish darajasini aniqlash
    let visionLevel = "Noma'lum";
    if (scorePercentage >= 90) {
        visionLevel = "1.0 - Ajoyib!";
    } else if (scorePercentage >= 80) {
        visionLevel = "0.9 - Yaxshi";
    } else if (scorePercentage >= 70) {
        visionLevel = "0.8 - O'rtacha";
    } else if (scorePercentage >= 60) {
        visionLevel = "0.7 - Kamchiliklar mavjud";
    } else {
        visionLevel = "0.6 - Ko'rish darajasi past";
    }

    resultElement.innerHTML = `
        ✅ To'g'ri javoblar: ${correctAnswers} ta <br>
        ❌ Noto'g'ri javoblar: ${totalAttempts - correctAnswers} ta <br>
        📊 Sizning natijangiz: <b>${scorePercentage}%</b> <br><br>
        🌟 Sizning ko'rish darajangiz: <b>${visionLevel}</b>
    `;

    testStatusElement.style.display = "none";
    gamePage.style.display = "none";
    resultPage.style.display = "block";
    startBtn.style.display = "block"; // Boshlash tugmasini yana chiqarish
}

function restartGame() {
    gamePage.style.display = "block";
    resultPage.style.display = "none";
    testStatusElement.style.display = "none";
    statusElement.innerText = "Harfni klaviaturadan kiriting.";
    harfElement.style.fontSize = "6rem";
    startBtn.style.display = "block"; // Boshlash tugmasini yana chiqarish
}

startBtn.addEventListener("click", startGame);
