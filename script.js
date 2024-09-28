const accessKey = "u-7HacAgxgQ14Y7Kzwho0h9vjvkCJWN0bG3ceXKaugw";

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const prevPageButton = document.getElementById("prev-page-button");
const nextPageButton = document.getElementById("next-page-button");
const pageInfo = document.getElementById("page-info");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputE1.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    // Clear the results only if it's the first page, otherwise append to the existing ones
    if (page === 1) {
        searchResults.innerHTML = "";
    }

    // Check if there are results and map them to the HTML
    if (results.length > 0) {
        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('search-result');

            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        // Show pagination controls
        pageInfo.textContent = `Page ${page}`;
        // prevPageButton.style.display = page > 1 ? "inline-block" : "none";  // Only show "Prev" if on page > 1
        nextPageButton.style.display = "inline-block";  // Always show "Next" if results are present
    } else {
        // Hide "Next" button if no more results
        nextPageButton.style.display = "none";
    }
}

// Handle form submission (search button)
formE1.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1; // Reset to page 1 for a new search
    searchImages();
});

// Handle "Next" button click
nextPageButton.addEventListener('click', () => {
    page++;  // Increase the page number
    searchImages();  // Fetch new page of images
});


