export { createPictureMarkup };
import { pictureContainer } from '../index';

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
             <a class="picture-link js-link" href="${largeImageURL}">
                <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
             </a>
             <div class="info">
                <p class="info-item">
                  <b>Likes ${likes}</b>
                </p>
                <p class="info-item">
                  <b>Views ${views}</b>
                </p>
                <p class="info-item">
                  <b>Comments ${comments}</b>
                </p>
                <p class="info-item">
                   <b>Downloads${downloads}</b>
                </p>
             </div>
        </div>;`;
    })
    .join('');

  pictureContainer.insertAdjacentHTML('beforeend', markup);
}

/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; */
