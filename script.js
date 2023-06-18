let links = [];
const inputEl = document.querySelector(`#input-el`);
const ulEl = document.querySelector(`#ul-el`);
const saveBtn = document.querySelector(`#save-btn`);
const tabBtn = document.querySelector(`#tab-btn`);
const deleteBtn = document.querySelector(`#delete-btn`);
const listContent = document.querySelector(`#list-content`);
const linksFromLocalStorage = JSON.parse(localStorage.getItem("links"));

if (linksFromLocalStorage) {
	links = linksFromLocalStorage;
	render(links);
}

tabBtn.addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		links.push(tabs[0].url);
		localStorage.setItem("links", JSON.stringify(links));
		render(links);
	});
});

function render(link) {
	let linkList = "";
	for (let i = 0; i < link.length; i++) {
		linkList += `
            <li>
                <a href="${link[i]}" target="_black">${link[i]}</a>
            </li>
        `;
	}
	ulEl.innerHTML = linkList;
}

deleteBtn.addEventListener("dblclick", () => {
	localStorage.clear();
	links = [];
	ulEl.innerHTML = "";
});

saveBtn.addEventListener("click", () => {
	links.push(inputEl.value);
	localStorage.setItem("links", JSON.stringify(links));
	inputEl.value = "";
	render(links);
});
