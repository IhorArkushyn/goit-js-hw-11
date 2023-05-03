import './css/styles.css';
import { fetchPictures } from './js/fetchPictures';
import { createPictureMarkup } from './js/pictureMarkup';
import { onScroll } from './js/scroll';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// const guard = document.querySelector('.js-guard');
const form = document.querySelector('#search-form');
const pictureContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');
const perPage = 40;
// const options = {
//   root: null,
//   rootMargin: '500px',
//   threshold: 0,
// };
// const observer = new IntersectionObserver(onPagination, options);

let query = '';
let totalPages = null;
let page = null;

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
      totalPages = data.totalHits / perPage;

      // if (page !== totalPages) {
      //   observer.observe(guard);
      // }

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

//  function onPagination(entries, observer) {
//   entries.forEach(async entry => {
//     console.log(entry);
//     if (entry.isIntersecting) {
//       page += 1;
//       try {
//         const { data } = await fetchPictures(query, page, perPage);
//         createPictureMarkup(data.hits);
//         lightbox.refresh();

//         // onScroll();

//         totalPages = data.totalHits / perPage;

//         if (page > totalPages) {
//           observer.unobserve(guard);
//           // loadMoreBtn.style.display = 'none';
//           Notify.failure(
//             "We're sorry, but you've reached the end of search results."
//           );
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   });
// }




async function onLoadMoreBtn() {
  page += 1;

  try {
    const { data } = await fetchPictures(query, page, perPage);

    createPictureMarkup(data.hits);
    lightbox.refresh();

    onScroll();

  totalPages = data.totalHits / perPage;

    if (page > totalPages) {
      // observer.unobserve(guard);
      loadMoreBtn.style.display = 'none';
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
    if (page >= totalPages) {
     loadMoreBtn.style.display = 'none';
   }
  } catch (error) {
    console.log(error);
  }
}
