import React from "react";
import ReactDOM from "react-dom/client";
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import App from "./App";
import { rootReducer } from "./redux/rootReducer";
import { forbiddenWordsMiddleware } from "./redux/middleware";
import { sagaWatcher } from "./redux/sagas";

const saga = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, forbiddenWordsMiddleware, saga),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

saga.run(sagaWatcher);

const root = ReactDOM.createRoot(document.getElementById("root"));

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

root.render(app);
