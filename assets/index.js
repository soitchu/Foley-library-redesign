const searchTabs = document.querySelector("#searchTabs").children;
const placeholders = [
    "Search for books, e-books, articles, videos, and more",
    "Search by instructor, course number, item title, or keyword",
    "Search by journal, magazine, or newspaper title"
];
for (const tab of searchTabs) {
    tab.addEventListener("click", function () {
        let count = 0;
        for (const tab of searchTabs) {
            if (tab === this) {
                tab.classList.add("active");
                document.getElementById("searchBox").placeholder = placeholders[count];
            } else {
                tab.classList.remove("active");
            }

            count++;
        }
    });
}