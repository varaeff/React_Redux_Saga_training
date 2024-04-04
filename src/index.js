import React from "react";
import ReactDOM from "react-dom/client";
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./redux/rootReducer";
import { forbiddenWordsMiddleware } from "./redux/middleware";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, forbiddenWordsMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
