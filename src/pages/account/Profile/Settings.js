import React from "react";
import GoogleForm from "./components/GoogleForm";
import PubNubForm from "./components/PubNubForm";

function Settings() {
  return (
    <>
      <div class="container-fluid px-1 py-5 mx-auto">
        <div class="row d-flex justify-content-center">
          <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <div class="card">
              <div class="form-card">
                <PubNubForm />
                <GoogleForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
