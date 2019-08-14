import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "load-posts") {
      return { ...state, listings: action.posts}
  }
  return state;
};

const store = createStore(
  reducer,
  { listings: [], loggedIn: false },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
