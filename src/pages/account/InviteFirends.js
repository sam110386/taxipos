import React, { useState, useRef } from "react";
import { ErrorDialog } from "../../blocks/Dialogs";
import { inviteFiends } from "../../services/userServices";
import Loader from "../../blocks/Loader";
import { isValidEmail } from "../../utils/helperFunctions";

const InviteFriends = () => {
  const link_container_ref = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [inviteEmails, setInviteEmails] = useState("");
  const [formError, setFormError] = useState("");

  const closeDialog = () => {
    setDialogMessage("");
    setShowDialog(false);
    setFormError("");
  };

  const validateEmails = (emails) => {
    let correct = true;
    for (let email of emails) {
      if (!isValidEmail(email)) correct = false;
    }
    return correct;
  };

  const sendInviteRequest = async () => {
    if (!inviteEmails) {
      setFormError("Please enter email to sent invite");
      return;
    }
    setFormError("");
    try {
      const emails = inviteEmails.split(",");
      if (!validateEmails(emails)) {
        setFormError("Please enter valid email address.");
        return;
      }
      setSubmitting(true);
      const res = await inviteFiends({ emails: inviteEmails });
      setSubmitting(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          setInviteEmails("");
        }
        setDialogMessage(res.data.message);
        setShowDialog(true);
      }
    } catch (err) {
      setSubmitting(false);
      setDialogMessage("");
      setShowDialog(true);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <h2>Invite Friends</h2>
      </div>
      <div className="col-12">
        <hr />
      </div>
      <div className="col-12">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-6">
              <div class="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Enter email address
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    value={inviteEmails}
                    className={`form-control ${formError ? "is-invalid" : ""}`}
                    placeholder="email1@example.com, email2@example.com"
                    onChange={(e) => setInviteEmails(e.target.value)}
                  />
                  {formError && (
                    <div className="invalid-feedback">{formError}</div>
                  )}
                </div>
              </div>
              <button className="btn" onClick={sendInviteRequest}>
                Invite Friends
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDialog && (
        <ErrorDialog message={dialogMessage} onClose={closeDialog} />
      )}
      {submitting && <Loader />}
      <div ref={link_container_ref} />
    </div>
  );
};

export default InviteFriends;
