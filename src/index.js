import './css/styles.css';
import { fetchPictures } from './js/fetchPictures';
import { createPictureMarkup } from './js/pictureMarkup';
import { createPictureMarkup } from './js/pictureMarkup';
import { onScroll } from './js/scroll';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const pictureContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');

let query = '';
let page = 1;
const perPage = 40;

form.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

loadMoreBtn.style.display = 'none';

async function onSearchForm(e) {
  e.preventDefault();

  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  pictureContainer.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  if (query === '') {
    Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }

  try {
    const { data } = await fetchPictures(query, page, perPage);

    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      createPictureMarkup(data.hits);
      lightbox.refresh();
      Notify.success(`Hooray! We found ${data.totalHits} images.`);

      if (data.totalHits > perPage) {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    form.reset();
  }
}

function onLoadMoreBtn() {
  page += 1;

  fetchPictures(query, page, perPage)
    .then(({ data }) => {
      createPictureMarkup(data.hits);
      lightbox.refresh();
      onScroll();

      const totalPages = data.totalHits / perPage;

      if (page > totalPages) {
        loadMoreBtn.style.display = 'none';
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}
