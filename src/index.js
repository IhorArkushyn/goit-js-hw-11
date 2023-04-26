import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createPictureMarkup } from './js/pictureMarkup';
import { fetchPictures } from './js/fetchPictures';
import './css/styles.css';

const pictureContainer = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-btn');
const loadMoreBtn = document.querySelector('.load-more');
// console.log(pictureContainer);
let query = ""
const form = document.querySelector('#search-form');
const formInput = form.elements.searchQuery;

const addPictureMarcup = createPictureMarkup(fetchPictures());
pictureContainer.addEventListener('click', onImageClick);
searchBtn.addEventListener('click', onPictureSearch);
formInput.addEventListener('input', onFormInput);
console.log(formInput);
function onFormInput(evt) {
  query = evt.currentTarget.value;
  console.log(query);
}
console.log(formInput);
pictureContainer.insertAdjacentHTML('beforeend', addPictureMarcup);



function onImageClick(event) {
  const isGalleryEl = event.target.classList.contains('image');

  event.preventDefault();

  if (!isGalleryEl) {
    return;
  }
}
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export { pictureContainer };