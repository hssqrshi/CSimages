document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.querySelector('.search-btn');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const nameInput = document.getElementById('name');
    const postsContainer = document.querySelector('.posts');
    const loadMoreButton = document.querySelector('.loadmore button');

    let currentPage = 1; // Initial page number for images
    const imagesPerPage = 20;

    function updateHomeImages() {
        // Set default images for the homepage
        const homeImages = postsContainer.querySelectorAll('img');
        homeImages.forEach((img, index) => {
            img.src = `https://source.unsplash.com/900x900/?bg&homepage=${index + 1}`;
        });
    }

    function searchImage() {
        const width = widthInput.value;
        const height = heightInput.value;
        const name = nameInput.value;

        if (!isNaN(width) && !isNaN(height)) {
            const timestamp = new Date().getTime();
            const apiUrl = `https://source.unsplash.com/${width}x${height}/?${name}&timestamp=${timestamp}`;

            const existingImages = postsContainer.querySelectorAll('img');
            existingImages.forEach((img, index) => {
                img.src = `${apiUrl}&search=${index + 1}`;
            });
        } else {
            alert('Please enter valid width and height values.');
        }
    }

    function toggleSearchButton() {
        const isInputNotEmpty = widthInput.value.trim() !== '' || heightInput.value.trim() !== '' || nameInput.value.trim() !== '';
        searchBtn.disabled = !isInputNotEmpty;
    }

    function loadMoreImages() {
        const startIdx = (currentPage - 1) * imagesPerPage + 1;
        const endIdx = startIdx + imagesPerPage - 1;

        for (let i = startIdx; i <= endIdx; i++) {
            const apiUrl = `https://source.unsplash.com/900x900/?bg&homepage=${i}`;
            const newImage = document.createElement('img');
            newImage.src = apiUrl;
            postsContainer.appendChild(newImage);
        }

        currentPage++;
    }

    widthInput.addEventListener('input', toggleSearchButton);
    heightInput.addEventListener('input', toggleSearchButton);
    nameInput.addEventListener('input', toggleSearchButton);

    searchBtn.addEventListener('click', searchImage);

    widthInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchImage();
        }
    });

    heightInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchImage();
        }
    });

    nameInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchImage();
        }
    });

    toggleSearchButton();
    updateHomeImages();

    postsContainer.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            const imageUrl = event.target.src;
            openModal(imageUrl);
        }
    });

    loadMoreButton.addEventListener('click', loadMoreImages);

    function openModal(imageUrl) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');

        modalImage.src = imageUrl;
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('imageModal');
        modal.style.display = 'none';
    }

    function downloadImage() {
        const modalImage = document.getElementById('modalImage');
        const imageUrl = modalImage.src;

        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'downloaded_image';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => console.error('Error downloading image:', error));
    }

    const closeButton = document.querySelector('.close-btn-container button');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    const downloadButton = document.querySelector('.download-btn-container button');
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadImage);
    }
});
function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("open");
}
