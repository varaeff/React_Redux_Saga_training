import { combineReducers } from "redux";
import { postsReducer } from "./postsReduser";
import { appReducer } from "./appReducer";

export const rootReducer = combineReducers({
  posts: postsReducer,
  app: appReducer,
});
