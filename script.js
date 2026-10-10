
const opened = new Set();

const cards = document.querySelectorAll(".surprise-card");

const backdrop = document.getElementById("modal-backdrop");
const modalTitle = document.getElementById("modal-title");
const modalEyebrow = document.getElementById("modal-eyebrow");
const modalContent = document.getElementById("modal-content");
const modalDecoration = document.getElementById("modal-decoration");
const modalDone = document.getElementById("modal-done");


// 1. Surprise content
const surpriseContent = {
    gift: {
        eyebrow: "A LITTLE PRESENT",
        title: "A pocketful of happy things ♡",
        icon: "🎁",
        html: `
            <p>Dear Nusrat, your gift is a box full of love♡</p>
            <p>🌷 Peace for your heart...</p>
            <p>✨ Courage for your dreams...</p>
            <p>🍓 Happiness in little things....</p>
            <p>💗 And a friend who is always cheering for you, ummaaah</p>
        `
    },

    photos: {
        eyebrow: "OUR MEMORIES",
        title: "Little moments, big love 📸",
        icon: "📸",
        html: `
            <p>Some moments become memories forever.</p>

            <div class="photo-slots">
                <div class="photo-slot">
                    <b>♡</b>
                    <img src="monu.jpeg" alt="Our best moment">

                    <span>Favourite Photo</span>
                </div>

                <div class="photo-slot">
                    <b>✿</b>
                    <img src="fun.jpeg" alt="Our best moment">

                    <span>Funny Memory</span>
                </div>

                <div class="photo-slot">
                    <b>✦</b>
                    <img src="our.jpg" alt="Our best moment">
                    <span>Best Moment</span>
                </div>
            </div>
        `
    },

    letter: {
        eyebrow: "FROM MY HEART",
        title: "A letter for my Monu 💌",
        icon: "💌",
        html: `
            <div class="letter-paper">
                Dear Nusrat,

                <br><br>

                Happy birthday, barishallaaaa! I hope your life is filled
                with happiness, peace, success and beautiful memories.

                <br><br>
                I just want you to know that you have such a beautiful soul and the purest heart.
                You deserve all the happiness, love and peace this world has to offer.
                Please don't let the little things make your heart sad, okay? 
                Even on the days when life feels heavy, I hope you always find a reason to smile, because your happiness means so much to me.

                <br><br>

                Always remember that you are precious, you are loved and you deserve so many beautiful things.
                I wish I could hug you tightly right now and remind you how special you are💗

                <br><br>
                I love you sooo much, cutieee! More than these little words can ever explain. 
                May Allah fill your life with endless happiness, protect your beautiful heart from every sadness and bless you with everything that is good for you...
                Ameen✨
                <div class="signature">
                    With love,<br>Your Noushe♡
                </div>
            </div>
        `
    },

    cake: {
        eyebrow: "MAKE A WISH",
        title: "Happy Birthday 🎂",
        icon: "🎂",
        html: `
            <p>Close your eyes and make a dua!</p>

            <div class="cake-scene" id="cake-scene">
                <div class="cake-base"></div>
                <div class="cake-icing"></div>
                <div class="cake-candle"></div>
                <div class="cake-flame"></div>
            </div>

            <button class="blow-button" id="blow-candle">
                Blow out the candle ✨
            </button>

            <p id="wish-message">
                May all your duas come true! ♡
            </p>
        `
    },

    countdown: {
        eyebrow: "YOUR FINAL SURPRISE",
        title: "A wish for your future ✨",
        icon: "💗",
        html: `
            <div class="final-reveal">
                <div class="big-heart">♡</div>

                <h3>Keep shining, Nusrat!</h3>

                <p>
                    May this new year bring you beautiful
                    opportunities, genuine happiness and
                    people who appreciate your heart. May allah keep you happy.
                    Keep your new little home peaceful, ameen...
                </p>

                <p>
                    You deserve all the love in the world Nusrat!
                </p>
            </div>
        `
    }
};


// 2. Open a surprise
function openSurprise(name) {
    const item = surpriseContent[name];

    if (!item) return;

    modalEyebrow.textContent = item.eyebrow;
    modalTitle.textContent = item.title;
    modalDecoration.textContent = item.icon;
    modalContent.innerHTML = item.html;

    modalDone.textContent = "Keep exploring ♡";

    backdrop.hidden = false;
    document.body.style.overflow = "hidden";

    markOpened(name);

    if (name === "cake") {
        document
            .getElementById("blow-candle")
            .addEventListener("click", blowCandle, { once: true });
    }
}


// 3. Update progress
function markOpened(name) {
    if (opened.has(name)) return;

    opened.add(name);

    const card = document.querySelector(
        `[data-surprise="${name}"]`
    );

    if (card) {
        card.classList.add("is-opened");
    }

    document.getElementById("opened-count").textContent =
        opened.size;

    document.getElementById("progress-fill").style.width =
        `${(opened.size / cards.length) * 100}%`;

    if (opened.size === cards.length) {
        document.getElementById("completion-note").hidden = false;

        launchConfetti(60);
    }
}


// 4. Close popup
function closeModal() {
    backdrop.hidden = true;
    document.body.style.overflow = "";
}


// 5. Blow out the birthday candle
function blowCandle() {
    document
        .getElementById("cake-scene")
        .classList.add("blown");

    document.getElementById("wish-message").textContent =
        "May Allah make your wish trueee♡";

    launchConfetti(30);
}


// 6. Confetti effect
function launchConfetti(amount = 30) {
    const layer = document.getElementById("confetti-layer");

    const colors = [
        "#e99bb2",
        "#c8b5e8",
        "#f3d6a5",
        "#b8d8bd",
        "#f6c5d3"
    ];

    for (let i = 0; i < amount; i++) {
        const piece = document.createElement("span");

        piece.className = "confetti";

        piece.style.left = `${Math.random() * 100}%`;

        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.setProperty(
            "--duration",
            `${2 + Math.random() * 3}s`
        );

        piece.style.setProperty(
            "--drift",
            `${Math.random() * 180 - 90}px`
        );

        layer.appendChild(piece);

        setTimeout(() => piece.remove(), 5500);
    }
}


// 7. Make surprise cards clickable
cards.forEach(card => {
    card.addEventListener("click", () => {
        openSurprise(card.dataset.surprise);
    });
});


// 8. Start button
document
    .getElementById("start-button")
    .addEventListener("click", () => {
        document
            .getElementById("surprises")
            .scrollIntoView({ behavior: "smooth" });

        launchConfetti(20);
    });


// 9. Close button
document
    .getElementById("modal-close")
    .addEventListener("click", closeModal);


// 10. Continue button
modalDone.addEventListener("click", closeModal);


// 11. Click outside popup to close
backdrop.addEventListener("click", event => {
    if (event.target === backdrop) {
        closeModal();
    }
});


// 12. Escape key closes popup
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !backdrop.hidden) {
        closeModal();
    }
});


// 13. Back to top
document
    .getElementById("back-to-top")
    .addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
