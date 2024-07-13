import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages, onFetchError, hideSpinner } from './js/pixabay-api';
import { renderImgCard } from './js/render-functions';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const queryValue = form.elements.query.value.trim();

  if (queryValue === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
  } else {
    fetchImages(queryValue)
      .then(data => {
        if (data.hits.length === 0) {
          iziToast.warning({
            title: 'No Results',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
        }
        renderImgCard(data.hits);
      })
      .catch(onFetchError)
      .finally(() => {
        form.reset();
        hideSpinner();
      });
  }
}
