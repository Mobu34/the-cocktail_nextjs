const initialState = {
  favoritesAlcohol: [],
  favoritesNonalcohol: [],
};

const toggleFavs = (stateFavs, actionValue) => {
  const nextFavorites = [...stateFavs];
  for (let i = 0; i <= nextFavorites.length; i++) {
    if (i === nextFavorites.length || nextFavorites.length === 0) {
      nextFavorites.push(actionValue);
      break;
    } else if (nextFavorites[i].idDrink === actionValue.idDrink) {
      nextFavorites.splice(i, 1);
      break;
    }
  }
  return nextFavorites;
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITES_ALCOHOLIC":
      return {
        ...state,
        favoritesAlcohol: toggleFavs(state.favoritesAlcohol, action.value),
      };

    case "TOGGLE_FAVORITES_NONALCOHOLIC":
      return {
        ...state,
        favoritesNonalcohol: toggleFavs(
          state.favoritesNonalcohol,
          action.value
        ),
      };
    default:
      return state;
  }
};

export default favoritesReducer;
