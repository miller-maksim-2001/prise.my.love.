/* =========================================================
   ДАННЫЕ
========================================================= */

const clues = [
    {
        answer: "пионы",
        title: "Подсказка №1",
        text: "Тебе уже передали первый конверт. В нём находится вопрос, ответ которого тебе поможет пройти дальше.",
        quote: "«Иногда самые простые вещи делают нас самыми счастливыми»"
    },

    {
        answer: "18.03.2025",
        title: "Подсказка №2",
        text: "Раньше этот кабинет был столовой, там мы впервые познакомились. Загадка лежит на столе у преподавателя.",
        quote: "«С этого дня началась наша история»"
    },

    {
        answer: "мася",
        title: "Подсказка №3",
        text: "Этот конверт находится у меня. Могу просто отправить загадку тебе. Или, если хочешь, отдам сам конверт.",
        quote: "«Некоторые имена навсегда остаются в памяти»"
    },

    {
        answer: "парк",
        title: "Подсказка №4",
        text: "Его ты найдёшь у себя в сумке. Я положил его в маленький кармашек.",
        quote: "«Маленькие места хранят большие воспоминания»"
    },

    {
        answer: "характер",
        title: "Подсказка №5",
        text: "Я спрятал эту подсказку под твоей партой. Её никто не заберёт кроме тебя.",
        quote: "«Есть вещи, которые невозможно не полюбить»"
    },

    {
        answer: "первый поцелуй",
        title: "Подсказка №6",
        text: "Его я прикрепил под твоей партой, в 402 кабинете. Ни кто не сможет его забрать кроме тебя.",
        quote: "«И вот мы дошли до самого важного момента»"
    }
];


const memories = [
    {
        file: "Первое свидание.jpg",
        title: "Первое свидание"
    },

    {
        file: "Прекрасное время.jpg",
        title: "Прекрасное время"
    },

    {
        file: "С днём рождения.jpg",
        title: "С днём рождения"
    },

    {
        file: "Первые дни весны.jpg",
        title: "Первые дни весны"
    },

    {
        file: "Наши воспоминания.jpg",
        title: "Наши воспоминания"
    },

    {
        file: "Наше море.jpg",
        title: "Наше море"
    },

    {
        file: "Мой лучик света.jpg",
        title: "Мой лучик света"
    },

    {
        file: "Лучший день.jpg",
        title: "Лучший день"
    },

    {
        file: "Концерт любви.jpg",
        title: "Концерт любви"
    },

    {
        file: "Глаза словно море.jpg",
        title: "Глаза словно море"
    }
];


/* =========================================================
   СОСТОЯНИЕ
========================================================= */

let currentClue = 0;
let unlockedClues = 1;

let currentMemory = 0;

let selectedDay = null;

let touchStartX = 0;

let toastTimeout = null;


/* =========================================================
   HELPERS
========================================================= */

function get(id) {
    return document.getElementById(id);
}


function normalize(value) {
    return value
        .trim()
        .toLowerCase()
        .replaceAll("ё", "е")
        .replace(/\s+/g, " ");
}


/* =========================================================
   ПЕРЕХОДЫ
========================================================= */

const screenIds = [
    "startScreen",
    "bookScreen",
    "memoriesScreen",
    "calendarScreen",
    "ticketScreen",
    "finalScreen"
];


function hideAllScreens() {

    screenIds.forEach((id) => {

        get(id).classList.add("is-hidden");

    });

}


function showScreen(id) {

    hideAllScreens();

    get(id).classList.remove("is-hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function transitionTo(id) {

    const transition =
        get("screenTransition");

    transition.classList.add("show");


    window.setTimeout(() => {

        showScreen(id);

    }, 250);


    window.setTimeout(() => {

        transition.classList.remove("show");

    }, 620);

}


/* =========================================================
   СТАРТ
========================================================= */

get("yesButton").addEventListener(
    "click",
    () => {


        transitionTo(
            "bookScreen"
        );

    }
);


get("noButton").addEventListener(
    "click",
    () => {

        const button =
            get("noButton");

        button.textContent =
            "Ну пожалуйста 🥺";


        window.setTimeout(() => {

            button.textContent =
                "Нет 😢";

        }, 1400);

    }
);


/* =========================================================
   КНИГА
========================================================= */

function renderClue() {

    const clue =
        clues[currentClue];


    get("clueNumber").textContent =
        currentClue + 1;


    get("currentPage").textContent =
        currentClue + 1;


    get("clueTitle").textContent =
        clue.title;


    get("clueText").textContent =
        clue.text;


    get("bookQuote").textContent =
        clue.quote;


    get("answerInput").value =
        "";


    get("answerMessage").textContent =
        "";


    updateClueDots();


    get("previousClue").style.visibility =
        currentClue === 0
            ? "hidden"
            : "visible";


    get("nextClue").style.visibility =
        currentClue < unlockedClues - 1
            ? "visible"
            : "hidden";

}


function updateClueDots() {

    document
        .querySelectorAll(".clue-dot")
        .forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentClue
            );


            dot.classList.toggle(
                "locked",
                index >= unlockedClues
            );


            dot.disabled =
                index >= unlockedClues;

        });

}


function buildClueDots() {

    const container =
        get("clueDots");


    container.innerHTML =
        "";


    clues.forEach(
        (_, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "clue-dot";


            button.textContent =
                index + 1;


            button.addEventListener(
                "click",
                () => {

                    if (
                        index >= unlockedClues
                    ) {
                        return;
                    }


                    currentClue =
                        index;


                    renderClue();

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


function showAnswerMessage(
    message,
    success
) {

    const target =
        get("answerMessage");


    target.textContent =
        message;


    target.style.color =
        success
            ? "#548266"
            : "#a95561";

}


function checkCurrentAnswer() {

    const entered =
        normalize(
            get("answerInput").value
        );


    if (!entered) {

        showAnswerMessage(
            "Введи ответ 😊",
            false
        );

        return;

    }


    const expected =
        normalize(
            clues[currentClue].answer
        );


    if (
        entered !== expected
    ) {

        showAnswerMessage(
            "Попробуй ещё раз 😊",
            false
        );

        return;

    }


    showAnswerMessage(
        "Правильно ❤️",
        true
    );


    if (
        currentClue === clues.length - 1
    ) {

        window.setTimeout(
            () => transitionTo("memoriesScreen"),
            750
        );

        return;
    }


    unlockedClues =
        Math.max(
            unlockedClues,
            currentClue + 2
        );


    window.setTimeout(
        () => {

            currentClue += 1;

            renderClue();

        },
        620
    );

}


get("checkAnswerButton").addEventListener(
    "click",
    checkCurrentAnswer
);


get("answerInput").addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {
            checkCurrentAnswer();
        }

    }
);


get("previousClue").addEventListener(
    "click",
    () => {

        if (
            currentClue > 0
        ) {

            currentClue -= 1;

            renderClue();

        }

    }
);


get("nextClue").addEventListener(
    "click",
    () => {

        if (
            currentClue < unlockedClues - 1
        ) {

            currentClue += 1;

            renderClue();

        }

    }
);


/* =========================================================
   СВАЙПЕР
========================================================= */

function renderMemories() {

    const track =
        get("photoTrack");


    track.innerHTML =
        "";


    memories.forEach(
        (memory, index) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "memory-card";


            card.dataset.index =
                index;


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                "image/" + memory.file;


            image.alt =
                memory.title;


            image.draggable =
                false;


            image.addEventListener(
                "error",
                () => {

                    image.style.opacity =
                        ".25";

                }
            );


            image.addEventListener(
                "click",
                () => {

                    get("modalImage").src =
                        image.src;


                    get("photoModal")
                        .classList
                        .add("open");

                }
            );


            const caption =
                document.createElement(
                    "div"
                );


            caption.className =
                "memory-caption";


            caption.innerHTML =
                `${memory.title} <span>♡</span>`;


            card.appendChild(
                image
            );


            card.appendChild(
                caption
            );


            track.appendChild(
                card
            );

        }
    );


    renderMemoryDots();

    updateMemorySlider();

}


function renderMemoryDots() {

    const container =
        get("photoDots");


    container.innerHTML =
        "";


    memories.forEach(
        (_, index) => {

            const dot =
                document.createElement(
                    "button"
                );


            dot.type =
                "button";


            dot.className =
                "photo-dot";


            dot.setAttribute(
                "aria-label",
                `Фотография ${index + 1}`
            );


            dot.addEventListener(
                "click",
                () => {

                    currentMemory =
                        index;


                    updateMemorySlider();

                }
            );


            container.appendChild(
                dot
            );

        }
    );

}


function updateMemorySlider() {

    const viewport =
        get("photoViewport");

    const width =
        viewport.clientWidth;

    get("photoTrack").style.transform =
        `translateX(-${currentMemory * width}px)`;


    document
        .querySelectorAll(".memory-card")
        .forEach((card, index) => {

            card.classList.toggle(
                "active",
                index === currentMemory
            );

        });


    document
        .querySelectorAll(".photo-dot")
        .forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentMemory
            );

        });

}


function nextPhoto() {

    currentMemory =
        (currentMemory + 1)
        % memories.length;


    updateMemorySlider();

}


function previousPhoto() {

    currentMemory =
        (currentMemory - 1 + memories.length)
        % memories.length;


    updateMemorySlider();

}


get("nextPhoto").addEventListener(
    "click",
    nextPhoto
);


get("previousPhoto").addEventListener(
    "click",
    previousPhoto
);


get("photoViewport").addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.touches[0].clientX;

    },
    { passive: true }
);


get("photoViewport").addEventListener(
    "touchend",
    (event) => {

        const endX =
            event.changedTouches[0].clientX;


        const difference =
            endX - touchStartX;


        if (
            Math.abs(difference) < 45
        ) {
            return;
        }


        if (
            difference < 0
        ) {

            nextPhoto();

        } else {

            previousPhoto();

        }

    },
    { passive: true }
);


get("continueButton").addEventListener(
    "click",
    () => {

        transitionTo(
            "calendarScreen"
        );

    }
);


/* =========================================================
   КАЛЕНДАРЬ
========================================================= */

function buildCalendar() {

    const container =
        get("calendarDays");


    container.innerHTML =
        "";


    const firstDay =
        new Date(
            2026,
            9,
            1
        );


    const lastDay =
        new Date(
            2026,
            10,
            0
        );


    let weekday =
        firstDay.getDay();


    if (
        weekday === 0
    ) {
        weekday = 7;
    }


    for (
        let i = 1;
        i < weekday;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "empty-day";


        container.appendChild(
            empty
        );

    }


    for (
        let day = 1;
        day <= lastDay.getDate();
        day++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "calendar-day";


        button.textContent =
            day;


        button.addEventListener(
            "click",
            () => {

                selectDate(
                    day,
                    button
                );

            }
        );


        container.appendChild(
            button
        );

    }

}


function selectDate(
    day,
    button
) {

    selectedDay =
        day;


    document
        .querySelectorAll(
            ".calendar-day"
        )
        .forEach(
            (item) => {

                item.classList.remove(
                    "selected"
                );

            }
        );


    button.classList.add(
        "selected"
    );


    get("selectedDate").textContent =
        `${day} октября 2026`;


    get("createTicketButton").disabled =
        false;

}


function calendarPulse() {

    const card =
        document.querySelector(
            ".calendar-card"
        );


    card.animate(
        [
            {
                transform:
                    "scale(.985)",
                opacity:
                    ".72"
            },
            {
                transform:
                    "scale(1)",
                opacity:
                    "1"
            }
        ],
        {
            duration:
                220,
            easing:
                "ease-out"
        }
    );

}


get("previousMonth").addEventListener(
    "click",
    () => {

        calendarPulse();

        showToast(
            "Здесь только октябрь 2026 ❤️"
        );

    }
);


get("nextMonth").addEventListener(
    "click",
    () => {

        calendarPulse();

        showToast(
            "Здесь только октябрь 2026 ❤️"
        );

    }
);


get("createTicketButton").addEventListener(
    "click",
    () => {

        if (
            !selectedDay
        ) {
            return;
        }


        get("ticketDate").textContent =
            `${selectedDay} октября 2026`;


        transitionTo(
            "ticketScreen"
        );

    }
);


/* =========================================================
   БИЛЕТ
========================================================= */

function createTicketCanvas() {

    const canvas =
        document.createElement(
            "canvas"
        );


    const context =
        canvas.getContext("2d");


    canvas.width =
        1800;

    canvas.height =
        900;


    const gradient =
        context.createLinearGradient(
            0,
            0,
            1800,
            900
        );


    gradient.addColorStop(
        0,
        "#f7e5d9"
    );


    gradient.addColorStop(
        1,
        "#dfbec0"
    );


    context.fillStyle =
        gradient;


    context.fillRect(
        0,
        0,
        1800,
        900
    );


    context.strokeStyle =
        "#a65a68";


    context.lineWidth =
        5;


    context.strokeRect(
        35,
        35,
        1730,
        830
    );


    context.fillStyle =
        "#533b3d";


    context.textAlign =
        "left";


    context.font =
        "bold 68px Georgia";


    context.fillText(
        "БИЛЕТ НА СВИДАНИЕ",
        100,
        160
    );


    context.font =
        "40px Georgia";


    context.fillText(
        "Для моей любимой Янулечки",
        100,
        245
    );


    context.fillStyle =
        "#8c6268";


    context.font =
        "30px Arial";


    context.fillText(
        "Дата:",
        100,
        350
    );


    context.fillStyle =
        "#4e383b";


    context.font =
        "bold 45px Georgia";


    context.fillText(
        `${selectedDay} октября 2026`,
        230,
        350
    );


    context.fillStyle =
        "#604649";


    context.font =
        "31px Georgia";


    const lines = [
        "«Этот день я хочу провести с тобой,",
        "погулять, посидеть в кофе или парке,",
        "посмеяться с шуток и просто побыть рядом»"
    ];


    lines.forEach(
        (line, index) => {

            context.fillText(
                line,
                100,
                480 + index * 52
            );

        }
    );


    context.fillStyle =
        "#9c5663";


    context.font =
        "italic 38px Georgia";


    context.fillText(
        "С любовью, Максим ❤️",
        100,
        700
    );


    context.fillStyle =
        "#c76576";


    context.font =
        "150px Georgia";


    context.fillText(
        "♥",
        1500,
        300
    );


    let barcodeX =
        1600;


    for (
        let i = 0;
        i < 14;
        i++
    ) {

        context.fillStyle =
            "#573b3f";


        context.fillRect(
            barcodeX,
            150,
            4 + (i % 3) * 3,
            500
        );


        barcodeX +=
            12;

    }


    return canvas;

}


get("downloadTicketButton").addEventListener(
    "click",
    () => {

        if (
            !selectedDay
        ) {
            return;
        }


        const canvas =
            createTicketCanvas();


        const link =
            document.createElement(
                "a"
            );


        link.download =
            `Билет_на_свидание_${selectedDay}_октября_2026.png`;


        link.href =
            canvas.toDataURL(
                "image/png"
            );


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        window.setTimeout(
            () => {

                transitionTo(
                    "finalScreen"
                );

            },
            500
        );

    }
);


get("shareTicketButton").addEventListener(
    "click",
    async () => {

        const text =
            `Билет на свидание — ${selectedDay} октября 2026 ❤️`;


        if (
            navigator.share
        ) {

            try {

                await navigator.share({
                    title:
                        "Билет на свидание ❤️",
                    text:
                        text
                });

            } catch (_) {}

            return;
        }


        if (
            navigator.clipboard
        ) {

            try {

                await navigator.clipboard.writeText(
                    text
                );


                showToast(
                    "Информация о билете скопирована ❤️"
                );

            } catch (_) {

                showToast(
                    text
                );

            }

            return;
        }


        showToast(
            text
        );

    }
);


/* =========================================================
   PHOTO MODAL
========================================================= */

get("closePhotoModal").addEventListener(
    "click",
    () => {

        get("photoModal")
            .classList
            .remove("open");


        get("modalImage").src =
            "";

    }
);


get("photoModal").addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            get("photoModal")
        ) {

            get("closePhotoModal").click();

        }

    }
);


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        get("toast");


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    window.clearTimeout(
        toastTimeout
    );


    toastTimeout =
        window.setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2400
        );

}


/* =========================================================
   СЕРДЕЧКИ
========================================================= */

function spawnHeart() {

    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "heart-particle";


    heart.textContent =
        Math.random() > .5
            ? "♡"
            : "♥";


    heart.style.left =
        `${Math.random() * 100}%`;


    heart.style.fontSize =
        `${12 + Math.random() * 18}px`;


    heart.style.animationDuration =
        `${7 + Math.random() * 7}s`;


    get("heartLayer").appendChild(
        heart
    );


    window.setTimeout(
        () => {

            heart.remove();

        },
        15000
    );

}


/* =========================================================
   ИНИЦИАЛИЗАЦИЯ
========================================================= */

buildClueDots();

renderClue();

renderMemories();

buildCalendar();

window.setInterval(
    spawnHeart,
    1800
);


window.addEventListener(
    "resize",
    () => {

        updateMemorySlider();

    }
);
