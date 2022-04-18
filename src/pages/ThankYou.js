import React, { Component } from "react";
// import Banner from '../blocks/Banner';
import MetaTagsInfo from "../blocks/MetaTagsInfo";
import Title from "../templates/Title";
import HomeAppBottom from "../blocks/HomeAppBottom";
var Constants = require("../config/Constants");
class ThankYou extends Component {
  state = {
    banner: {
      title: "Thank you for your message. We will contact you shortly",
      background: "",
    },
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = Constants.SITE_TITLE + " | Thank You";
  }
  renderMeta = () => {
    return (
      <MetaTagsInfo
        metas={{
          metatitle: "Thank you for your message. We will contact you shortly",
          metadescription:
            "Thank you for your message. We will contact you shortly",
          metakeyword:
            "Thank you for your message. We will contact you shortly",
        }}
        pageTitle={"Thank you"}
      />
    );
  };
  render() {
    return (
      <section className="contact_sec contact_page">
        <Title title="Thank you!!" />
        <div className="container">
          <div className="mb-5 mt-5">
            <div className="dream_text text-center">
              <h2 className="text-center">{this.state.banner.title}</h2>
            </div>
          </div>
        </div>
        <HomeAppBottom bgclass="bg-gray" />
      </section>
    );
  }
}

export default ThankYou;
