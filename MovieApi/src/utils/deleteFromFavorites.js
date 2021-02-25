export function deleteFromFavorites(id) {
  let favs = JSON.parse(localStorage.getItem("movie"));
  const parsed = favs.filter((fav) => fav.id !== id);
  localStorage.setItem("movie", JSON.stringify(parsed));
  return parsed;
}
