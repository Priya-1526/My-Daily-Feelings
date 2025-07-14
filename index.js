const text = document.querySelector(".mobile");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
    window.electronAPI.loadPage("writeToday.html");
});

const changeRectangleColor = (color) => {
    text.classList.remove("bg-ACC794", "bg-abc2f1", "bg-fdb56c");

    if (color === "#ACC794") {
        text.classList.add("bg-ACC794");
    } else if (color === "#abc2f1") {
        text.classList.add("bg-abc2f1");
    } else if (color === "#fdb56c") {
        text.classList.add("bg-fdb56c");
    }
};

const textChange = () => {
    const words = ["happy", "bored", "sad"];
    const textColors = ["#739159", "#172063", "#8f4000"];
    const bgColors = ["#ACC794", "#abc2f1", "#fdb56c"];
    const rectColors = ["#ACC794", "#abc2f1", "#fdb56c"];

    let index = 0;

    const updateText = () => {
        text.textContent = words[index];
        text.style.color = textColors[index];
        changeRectangleColor(rectColors[index]);
        document.body.style.backgroundColor = bgColors[index];
        index = (index + 1) % words.length;
    };

    updateText();
    setInterval(updateText, 4000);
};

textChange();
