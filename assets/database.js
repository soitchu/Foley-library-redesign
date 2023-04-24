const infoDOM = document.getElementById("databaseInfo");

infoDOM.innerHTML = databaseData.data.html;

const quickLinks = document.getElementById("quickLinks");
const container = document.getElementById("container");
const resultCards = document.querySelectorAll(".s-lg-az-result");
let lastOffsetTop = null;

for (const card of resultCards) {
    card.addEventListener("click", function () {
        card.classList.toggle("open");
    });
}

for (let i = 65; i < 65 + 23; i++) {
    const alphabet = String.fromCharCode(i);
    const newLink = document.createElement("div");
    newLink.id = `quick-${alphabet}`;
    newLink.className = "scrollToView";
    newLink.textContent = alphabet;

    newLink.addEventListener("click", function () {
        const DOMToScroll = document.getElementById(`s-lg-az-name-${alphabet.toLowerCase()}`);
        if (DOMToScroll) {
            DOMToScroll.scrollIntoView();
            document.getElementById("container").scrollBy(0, -200);
        }
    });

    quickLinks.append(newLink);
}

container.addEventListener("scroll", function () {
    if (lastOffsetTop == null) {
        lastOffsetTop = quickLinks.offsetTop;
    } else if (lastOffsetTop != quickLinks.offsetTop) {
        !quickLinks.classList.contains("stickied") ? quickLinks.classList.add("stickied") : null;
    } else {
        quickLinks.classList.contains("stickied") ? quickLinks.classList.remove("stickied") : null;
    }
});


window.onresize = () => {
    lastOffsetTop = null;
}