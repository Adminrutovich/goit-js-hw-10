const BASE_URL1 = "https://api.thecatapi.com/v1/breeds";
const BASE_URL2 = "https://api.thecatapi.com/v1/images";
const API_KEY = 'live_SjA8aHXIwYbN0mNIHXAFWohLtCkknXu5DfyNPMBJPIwaNZxmMo9jT47syxtp5qSS';


export function fetchBreeds() {
    return fetch(`${BASE_URL1}?api_key=${API_KEY}`)
    .then((resp) => {
              if (!resp.ok) {
                throw new Error(resp.statusText);
              }
        
              return resp.json();
            }
          );
}

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL2}/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      return resp.json();
    }
  );
};


