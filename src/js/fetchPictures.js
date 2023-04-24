// export { fetchPictures };

import axios from 'axios';
// const API_KEY = '35667188-6e941f88d5c46bed3c473b87c';

async function fetchPictures(query, per_page, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35667188-6e941f88d5c46bed3c473b87c';
  const params = new URLSearchParams({
    key: API_KEY,
    q: 'cat',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
  });
 const response = await axios.get('${BASE_URL}?${params}');
 console.log(response);
  // await axios('${BASE_URL}?${params}').then(response => {
  //   console.log(response);
  // });
}
fetchPictures();

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const FILTER_RESPONSE = '?key,q,image_type=photo,orientation=horizontal,safesearch=true';

// 'https://pixabay.com/api/?key=35667188-6e941f88d5c46bed3c473b87c&q=yellow+flowers&image_type=photo'

// export { fetchCountries };
