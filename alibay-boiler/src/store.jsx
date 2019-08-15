import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "load-posts") {
    return { ...state, listings: action.posts };
  }
  if (action.type === "query") {
    return { ...state, searchQuery: action.q };
  }
  return state;
};

const store = createStore(
  reducer,
  { listings: [], loggedIn: false, searchQuery: "" },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
