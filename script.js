const accessKey = 'zENeNMCZOni5oyl9CtztEH6b9qhRIcLQ19hX-5pw9KA';

const formEl = document.querySelector('form');
const inputEl = document.querySelector('#search-input');
const searchResults = document.querySelector('.search-results');
const showMoreButton = document.querySelector('#show-more-button');

let inputData = '';
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

	
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
	
  if (page === 1) {
		searchResults.innerHTML = '';
  }
	
  results.map((result) => {
		const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search-result');
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;
		
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
		console.log(searchResults)
		
		// searchResults.insertAdjacentHTML('beforeend', 
		// `
		// <div class="search-result">
		// 	<img src="${result.urls.small}" alt="Mountains under the sky">
		// 	<a href="${result.links.html} target="_blank">${result.alt_description}</a>
		// </div>`
		// )
  });
  page++;
	if(page > 1) {
		showMoreButton.style.display = 'block'
	}
}

formEl.addEventListener('submit', function(e){
	e.preventDefault()
	page = 1;
	searchImages()
})

showMoreButton.addEventListener('click', function(){
	searchImages()
})