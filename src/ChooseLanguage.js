import React, { Component } from "react";
import i18n from "./i18n";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import englandFlag from "./assets/icon-england-flag.png";
import germanyFlag from "./assets/icon-germany-flag.png";
import holandFlag from "./assets/icon-holand-flag.png";
import italyFlag from "./assets/italy-flag-icon-16.png";
import franceFlag from "./assets/icon-france-flag.png";
import albaniaFlag from "./assets/albania-flag-square-icon-16.png";

const data = [
  {
    flag: englandFlag,
    nation: "English",
    lang: "en",
  },
  {
    flag: germanyFlag,
    nation: "Deutsch",
    lang: "ge",
  },
  {
    flag: holandFlag,
    nation: "Nederlands",
    lang: "du",
  },
  {
    flag: italyFlag,
    nation: "Italian",
    lang: "ita",
  },
  {
    flag: franceFlag,
    nation: "Français",
    lang: "fr",
  },
  {
    flag: albaniaFlag,
    nation: "Shqip",
    lang: "al",
  },
];

class ChooseLanguage extends Component {
  state = {
    flag: englandFlag,
    nation: "English",
    isOpen: false,
  };

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  handleSelect = (flag, nation, lang) => {
    if (!this.state.isOpen) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
      flag: flag,
      nation: nation,
    }));
    this.changeLanguage(lang);
  };

  handleOpen = () => {
    if (!this.state.isOpen) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleOutsideClick = (e) => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.handleOpen();
    }
  };

  render() {
    return (
      <div className="choose-languages">
        <div className="choose-languages__select" onClick={this.handleOpen}>
          <span className="choose-languages__select-flag">
            <img src={this.state.flag} alt="" />
          </span>
          <span className="choose-languages__select-nation">
            {this.state.nation}
          </span>{" "}
          <ArrowDropDownIcon />
        </div>

        {this.state.isOpen ? (
          <div className="choose-languages__list" ref={this.setWrapperRef}>
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  this.handleSelect(
                    data[index].flag,
                    data[index].nation,
                    data[index].lang
                  )
                }
                className="choose-languages__item"
              >
                <span className="choose-languages__item-flag">
                  <img src={item.flag} alt="" />
                </span>
                <span className="choose-languages__item-nation">
                  {item.nation}
                </span>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ChooseLanguage;
