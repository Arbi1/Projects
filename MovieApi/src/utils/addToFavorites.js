import axios from "axios";

export async function addToFavorites(id) {
  try {
    const theMovie = await axios.get("http://api.tvmaze.com/shows/" + id);
    let favs = [];

    if (localStorage.getItem("movie")) {
      favs = JSON.parse(localStorage.getItem("movie"));
    }
    if (favs.find((fav) => fav.id === theMovie.data.id)) {
      return 0;
    }
    favs.push(theMovie.data);
    localStorage.setItem("movie", JSON.stringify(favs));
    return 1;
  } catch (err) {
    return -1;
    console.log(err);
  }
}
