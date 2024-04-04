import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { fetchPosts } from "../redux/actions";
import { Loader } from "./Loader";

export default function FetchedPosts() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.app.loading;
  });
  const posts = useSelector((state) => {
    return state.posts.fetchedPosts;
  });

  if (loading) {
    return <Loader />;
  }

  if (!posts.length) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(fetchPosts());
        }}
      >
        Загрузить
      </button>
    );
  }
  return posts.map((post) => <Post post={post} key={post.id} />);
}
