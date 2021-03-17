import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { Input } from "reactstrap";
import { WithContext as ReactTags } from "react-tag-input";
import "../../utilis/reactTag.css";
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [
        { id: "biology", text: "Biology" },
        { id: "machine-learning", text: "Machine Learning" },
        { id: "data-science", text: "Data Science" },
        { id: "physics", text: "Physics" },
        { id: "chemistry", text: "Chemistry" },
        { id: "materials", text: "Materials" },
      ],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState((state) => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tags !== this.state.tags) {
      console.log(this.state.tags);
    }
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <Fragment>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          delimiters={delimiters}
          inputFieldPosition="top"
        />
      </Fragment>
    );
  }
}

export default connect(null, null)(Tags);
