import axios from 'axios';
export { fetchPictures };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '35667188-6e941f88d5c46bed3c473b87c';
// const form = document.querySelector('#search-form');
// const formInput = form.elements.searchQuery.value;
// const query = formInput.value;
// console.log(formInput);
// console.log(formInput.value);

async function fetchPictures(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  });
  const response = await axios.get(`?${params}`);
  return response;
}
// fetchPictures();