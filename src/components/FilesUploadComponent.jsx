//currently not in use
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class FilesUploadComponent extends Component {
  state = {
    profileImg: "",
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  onFileChange = (e) => {
    var files = e.target.files;
    this.setState({ profileImg: files[0].name });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", this.state.profileImg);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios.put("/api/users/profile-picture", formData, config).then((res) => {});
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.onSubmit} encType="multipart/form-data">
            <div className="form-group">
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={this.onFileChange}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, null)(FilesUploadComponent);
