import React from "react";
import { connect } from "react-redux";
import { createPost, showAlert } from "../redux/actions";
import { Alert } from "./Alert";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { title } = this.state;
    if (title.trim()) {
      const newPost = {
        title: title.trim(),
        id: Date.now().toString(),
      };
      this.props.createPost(newPost);
      this.setState({ title: "" });
    } else {
      this.setState({ title: "" });
      return this.props.showAlert("Название поста не может быть пустым");
    }
  };

  changeInputHandler = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.alert && <Alert text={this.props.alert} />}

        <div className="mb-3">
          <label htmlFor="title">Заголовок поста</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.changeInputHandler}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Создать
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

const mapDispatchToProps = {
  createPost,
  showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
