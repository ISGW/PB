document.addEventListener('DOMContentLoaded', () => {
    const pasteForm = document.getElementById('pasteForm');
    const linksContainer = document.getElementById('linksContainer');

    pasteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const linkInput = document.getElementById('link');
        const descriptionInput = document.getElementById('description');
        const link = linkInput.value.trim();
        const description = descriptionInput.value.trim();

        if (link !== '') {
            const linkObject = { link, description };
            saveLink(linkObject);
            displayLinks();
            linkInput.value = '';
            descriptionInput.value = '';
        }
    });

    function saveLink(linkObject) {
        let links = JSON.parse(localStorage.getItem('links')) || [];
        links.push(linkObject);
        localStorage.setItem('links', JSON.stringify(links));
    }

    function displayLinks() {
        linksContainer.innerHTML = '';
        let links = JSON.parse(localStorage.getItem('links')) || [];
        links.forEach((linkObject, index) => {
            const linkItem = document.createElement('div');
            linkItem.innerHTML = `
                <a href="${linkObject.link}" target="_blank">${linkObject.description || linkObject.link}</a>
                <button class="removeBtn" data-index="${index}">Remove</button>
            `;
            linksContainer.appendChild(linkItem);
        });

            // Attach event listener for remove buttons
    const removeButtons = document.querySelectorAll('.removeBtn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            removeLink(index);
            displayLinks();
        });
    });

    }

    displayLinks();
});

function removeLink(index) {
    let links = JSON.parse(localStorage.getItem('links')) || [];
    links.splice(index, 1);
    localStorage.setItem('links', JSON.stringify(links));
}

