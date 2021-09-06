const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22363451-8577670099bbad87a35d9bf1c';

function fetchCard(name, page) {
  console.log(name);
  return fetch(
    `${BASE_URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Not found ${name}`));
  });
}

const api = { fetchCard };

export default api;
