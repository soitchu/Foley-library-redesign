const infoDOM = document.getElementById("databaseInfo");

// infoDOM.innerHTML = researchGuideData.data.content;


const quickLinks = document.getElementById("quickLinks");
const index = [];
let lastOffsetTop = null;


container.addEventListener("scroll", function () {
    if (lastOffsetTop == null) {
        lastOffsetTop = quickLinks.offsetTop;
    } else if (lastOffsetTop != quickLinks.offsetTop) {
        !quickLinks.classList.contains("stickied") ? quickLinks.classList.add("stickied") : null;
    } else {
        quickLinks.classList.contains("stickied") ? quickLinks.classList.remove("stickied") : null;
    }
});


function newCard(data) {
    const con = document.createElement("div");
    con.className = "s-lg-az-result";
    con.innerHTML = `<div class="s-lg-az-result-title" ${!data.description ? "style = \"margin-bottom: 0 !important;\"" : ""}>
                        <a href="${data.link}" target="_blank">${data.title}</a>
                    </div>

                    <div class="s-lg-az-result-description">
                        ${data.description}
                    </div>`;

    infoDOM.append(con);

}

function newHeading(title) {
    const heading = document.createElement("h3");
    heading.className = "s-lg-db-panel-title";
    heading.textContent = title;
    infoDOM.append(heading);

    return heading;
}

let lastFirstChar = null;

for (const heading of researchGuideData) {
    const headingDOM = newHeading(heading.heading);
    const firstChar = heading.heading[0];

    if (lastFirstChar != firstChar || lastFirstChar == null) {
        index.push(firstChar.toUpperCase());
        headingDOM.id = `s-lg-az-name-${firstChar.toLowerCase()}`;
    }

    for (const section of heading.sections) {
        newCard(section);
    }

    lastFirstChar = firstChar;
}


for (let i = 0; i < index.length; i++) {
    const alphabet = index[i];
    const newLink = document.createElement("div");
    newLink.id = `quick-${alphabet}`;
    newLink.className = "scrollToView";
    newLink.textContent = alphabet;

    newLink.addEventListener("click", function () {
        history.pushState({}, "", "#" + alphabet);
        const DOMToScroll = document.getElementById(`s-lg-az-name-${alphabet.toLowerCase()}`);
        if (DOMToScroll) {
            DOMToScroll.scrollIntoView();
            document.getElementById("container").scrollBy(0, -200);
        }
    });

    quickLinks.append(newLink);
}

const resultCards = document.querySelectorAll(".s-lg-az-result");

for (const card of resultCards) {

    card
        .querySelector(".s-lg-az-result-description")
        .addEventListener("click", function () {
            card.classList.toggle("open");
        });

    card
        .querySelector(".s-lg-az-result-title")
        .addEventListener("click", function (event) {
            event.stopPropagation();
        });
}

window.onresize = () => {
    lastOffsetTop = null;
}

if (location.hash) {
    const index = location.hash.substring(1);
    const DOMToScroll = document.getElementById(`s-lg-az-name-${index.toLowerCase()}`);
    if (DOMToScroll) {
        DOMToScroll.scrollIntoView();
        document.getElementById("container").scrollBy(0, -200);
    }
}