import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
  
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const oldFav = state.favs.find((item) => item.id === action.payload.id);
      if (oldFav) {
        return state;
      } else {
        const newState = { ...state, favs: [...state.favs, action.payload] };
        writeFavsToLocalStorage(newState);
        return state;
      }

    case FAV_REMOVE:
      const removedFavState = {
        ...state,
        favs: state.favs.filter((fav) => fav.id !== action.payload),
      };
      writeFavsToLocalStorage(removedFavState);
      return removedFavState;

    case FETCH_SUCCESS:
      return { ...state, current: action.payload, error: null, loading: false };

    case FETCH_LOADING:
      return { ...state, current:null, loading: true, error: null };

    case FETCH_ERROR:
      return { ...state, error: action.payload, loading: false, current: null };

    case GET_FAVS_FROM_LS:
      const favFromLs = readFavsFromLocalStorage();
      return { ...state, favs: favFromLs ? favFromLs : [] };

    default:
      return state;
  }
}
