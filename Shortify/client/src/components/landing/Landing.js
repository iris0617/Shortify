import React, { Component } from "react";
import "./Landing.css";
import { createShortUrl, showRank } from "../../APIHelper";
import constants from "../../config/constants";
import Rank from "./rank";

class Landing extends Component {
  constructor() {
    super();
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }
  state = {
    post: [],
    showShortenUrl: false,
    shortenUrl: "",
    originalUrl: "",
    baseUrl: constants.baseUrl,
    clickSubmit: true,
    showError: false,
    apiError: "",
    showApiError: false,
    showLoading: false,
    exShortUrl: constants.baseUrl
  };
  async componentDidMount() {
    const { data: post } = await showRank();
    this.setState({ post: post });
  }
  handleFocus(e) {
    e.target.value === "";
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleSubmit() {
    this.setState({ clickSubmit: true, showApiError: false });
    if (this.state.clickSubmit && this.state.originalUrl) {
      this.setState({ showLoading: true, showShortenUrl: false });
      let reqObj = {
        originalUrl: this.state.originalUrl,
        shortBaseUrl: this.state.baseUrl
      };
      createShortUrl(reqObj)
        .then(json => {
          setTimeout(() => {
            this.setState({
              showLoading: false,
              showShortenUrl: true,
              shortenUrl: json.data.shortUrl
            });
          }, 0);
        })
        .catch(error => {
          this.setState({
            showLoading: false,
            showApiError: true,
            apiError: "Server Error"
          });
        });
    } else {
      this.setState({ showError: true });
    }
  }
  renderButton() {
    if (!this.state.showLoading) {
      return (
        <button
          className="btn btn-dark waves-effect waves-light submit-btn"
          name="action"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      );
    } else {
      return (
        <div className="loader">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="landing">
        <div>
          <h5>*Paste Your Original Url : )</h5>
        </div>
        <input
          name="originalUrl"
          field="originalUrl"
          placeholder="Paste your link.."
          value={this.state.originalUrl}
          onChange={this.handleUserInput.bind(this)}
        />
        {this.state.showError && (
          <div className="formError">Original Url is required</div>
        )}
        <div>
          <h5>*Set Your Customized Alias : )</h5>
        </div>
        <input
          field="baseUrl"
          name="baseUrl"
          placeholder={this.state.exShortUrl}
          onFocus={this.handleFocus.bind(this)}
          onChange={this.handleUserInput.bind(this)}
        />
        {this.renderButton()}
        {this.state.showApiError && (
          <div className="shorten-error">{this.state.apiError}</div>
        )}
        {this.state.showShortenUrl && (
          <div className="shorten-title">
            Shortened Url is ->{` `}
            <a target="_blank" href={this.state.originalUrl}>
              {this.state.shortenUrl}
            </a>
          </div>
        )}
        <div className="shorten-imp">
          [* Your default alias is set to *
          <a target="_blank" href={this.state.exShortUrl}>
            {this.state.exShortUrl}
          </a>
          * .Change it to whatever you wanted!]
        </div>
        <div className="table">
          <div className="tablename">Our Top 5 Visited URLs : )</div>
          <Rank data={this.state.post} />
        </div>
      </div>
    );
  }
}

export default Landing;
