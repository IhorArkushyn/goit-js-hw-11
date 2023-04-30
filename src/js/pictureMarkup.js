export { createPictureMarkup };
// import { fetchPictures } from './fetchPictures';
const pictureContainer = document.querySelector('.gallery');
// const guard = document.querySelector('.js-guard');

// const options = {
//   root: null,
//   rootMargin: '400px',
//   threshold: 0,
// };
// let observer = new IntersectionObserver(onPagination, options);
// // console.log(entries);
// function onPagination(entries, observer) {
//   console.log(entries);
//   // entries.forEach(entry => {});
// }

function createPictureMarkup(images) {
  const markup = images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<div class="photo-card">
                 <div class="thumb">
                    <a class="picture-link js-link" href="${largeImageURL}">
                      <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                    </a>
                  </div>
                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b>${likes}
                    </p>
                    <p class="info-item">
                      <b>Views</b>${views}
                    </p>
                    <p class="info-item">
                      <b>Comments</b>${comments}
                    </p>
                    <p class="info-item">
                       <b>Downloads</b>${downloads}
                    </p>
                </div>
              </div>`;
    })
    .join('');

  pictureContainer.insertAdjacentHTML('beforeend', markup);
  // if (data.page !== data.totalPages) {
  //   observer.observe(guard);
  // }
}
