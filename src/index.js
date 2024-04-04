import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import App from "./App";
import { forbiddenWordsMiddleware } from "./redux/middleware";
import { sagaWatcher } from "./redux/sagas";
import { postsReducer } from "./redux/postsReduser";
import { appReducer } from "./redux/appReducer";

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    posts: postsReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware().concat(
      forbiddenWordsMiddleware,
      saga
    );

    return middleware;
  },
});

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
