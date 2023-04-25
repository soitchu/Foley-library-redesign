const placeholders = [
    "Search for books, e-books, articles, videos, and more",
    "Search by instructor, course number, item title, or keyword",
    "Search by journal, magazine, or newspaper title"
];
const menuItems = document.querySelectorAll(".menuItem");
const spotlightDOM = document.querySelector(".spotlight");

function closeAllMenu() {
    for (const item of menuItems) {
        item.classList.remove("open");
        item.setAttribute("open", "false");
    }
}


let searchTabs = document.querySelector("#searchTabs");
if (searchTabs) {
    searchTabs = searchTabs.children;

    const searchLinks = [
        "https://library.search.gonzaga.edu/discovery/search?tab=Everything&search_scope=MyInst_and_CI&vid=01WIN_GONZAGA:FOLEY&lang=en&offset=0&query=any,contains,",
        "https://library.search.gonzaga.edu/discovery/search?tab=CourseReserves&search_scope=CourseReserves&vid=01WIN_GONZAGA:FOLEY&lang=en&offset=0&query=any,contains,",
        "https://library.search.gonzaga.edu/discovery/jsearch?vid=01WIN_GONZAGA:FOLEY&tab=jsearch_slot&lang=en&pcAvailability=true&query=any,contains,"
    ];

    let currentTab = 0;
    const searchButton = document.querySelector("#searchButton");
    const searchBox = document.querySelector("#searchBox");
    const searchForm = document.querySelector("#searchForm");

    for (const tab of searchTabs) {
        tab.addEventListener("click", function () {
            let count = 0;
            for (const tab of searchTabs) {
                if (tab === this) {
                    currentTab = count;
                    tab.classList.add("active");
                    searchBox.value = "";
                    searchBox.placeholder = placeholders[count];
                } else {
                    tab.classList.remove("active");
                }

                count++;
            }
        });
    }

    searchButton.addEventListener("click", function (event) {
        const query = searchBox.value;
        window.open(searchLinks[currentTab] + query, "_blank");
        event.preventDefault();
    });

    const clip = new ClipboardJS('.copy');

    clip.on('success', function (e) {
        alert("Copied the phone number to your clipboard!");
    });
}

for (const item of menuItems) {
    const expandedMenu = item.querySelector(".menuExpanded");
    const expandedClose = item.querySelector(".closeMenuExpanded");

    if (expandedMenu) {
        expandedMenu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    if (expandedClose) {
        expandedClose.addEventListener("click", function (event) {
            item.classList.remove("open");
            spotlightDOM.style.display = "none";
        });
    }

    item.addEventListener("click", function () {
        closeAllMenu();
        if (this.getAttribute("open") === "true") {
            spotlightDOM.style.display = "none";
            this.classList.remove("open");
            this.setAttribute("open", "false");
        } else {
            spotlightDOM.style.display = "block";
            this.classList.add("open");
            this.setAttribute("open", "true");
        }
    });


}

spotlightDOM.addEventListener("click", function () {
    closeAllMenu();
    this.style.display = "none";
});