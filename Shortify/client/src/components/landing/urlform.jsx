import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import constants from "../../config/constants";
import { createShortUrl, showRank } from "../../APIHelper";
class UrlForm extends Form {
  state = {
    data: { originalUrl: "", baseUrl: "" },
    errors: {
      originalUrl: "",
      baseUrl: ""
    },
    showShortenUrl: false,
    shortenUrl: "",
    originalUrl: "",
    baseUrl: "",
    clickSubmit: true,
    showError: false,
    apiError: "",
    showApiError: false,
    showLoading: false,
    exUrl: "https://www.amazon.com/Apple-iPhone-GSM-Unlocked-5-8/dp/B075QMZH2L",
    exShortUrl: constants.baseUrl
  };
  schema = {
    originalUrl: Joi.string()
      .required()
      .label("originalUrl"),
    baseUrl: Joi.string().label("baseUrl")
  };
  handleSubmit() {
    this.setState({ clickSubmit: true, showApiError: false });
    if (this.state.clickSubmit && this.state.originalUrl) {
      this.setState({ showLoading: true, showShortenUrl: false });
      let reqObj = {
        originalUrl: this.state.originalUrl,
        shortBaseUrl: constants.baseUrl
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
  render() {
    return (
      <div>
        <div className="controlled-form">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("originalUrl", "*Paste Your Original Url : )")}
            {this.renderInput("baseUrl", "*Set Your Customized Alias : )")}
            {this.renderButton("Shorten It")}
          </form>
        </div>
      </div>
    );
  }
}

export default UrlForm;
