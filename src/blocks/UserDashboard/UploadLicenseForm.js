import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { ErrorDialog } from "../Dialogs";
import Loader from "../Loader";
import { loadUserDetail } from "../../store/actions/UserAction";
import * as BlinkIDSDK from "@microblink/blinkid-in-browser-sdk";
import {
  updateLicense,
  uploadLicenseDocument,
} from "../../services/userServices";
import ImageCropperModal from "../Modals/ImageCropperModal";
import imageCompression from "browser-image-compression";

const imageCompressOptions = {
  maxSizeMB: 2,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  initialQuality: 1,
};

const uploadLicenseSchema = Yup.object().shape({
  license_doc_1: Yup.string().required("Required"),
  license_doc_2: Yup.string().required("Required"),
});

const UploadLicense = ({ refreshUserDetail, onResponse }) => {
  const formRef = useRef();
  const front_image_ref = useRef();
  const back_image_ref = useRef();

  const [submitting, setSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [fileFormatDl1, setFileFormatDl1] = useState("");
  const [fileFormatDl2, setFileFormatDl2] = useState("");
  const [recognizerRunner, setRecognizerRunner] = useState(null);
  const [
    combinedGenericIDRecognizer,
    setCombinedGenericIDRecognizer,
  ] = useState(null);

  const [currentImageToCrop, setCurrentImageToCrop] = useState(null);
  const [currentImageSide, setCurrentImageSide] = useState(null);
  const [imageLoadingSide, setImageLoadingSide] = useState(0);

  const showMessage = (msg) => {
    if (onResponse) {
      onResponse(msg);
      return;
    }
    setErrorMessage(msg);
    setIsError(true);
  };

  const showFieldError = (msg, field) => {
    if (formRef.current)
      formRef.current.setFieldError(`license_doc_${field}`, msg);
  };

  const updateLicenseDetails = async (results) => {
    try {
      const add_splits = results.address.split(",");
      const info = {
        jurisdictionRestrictionCodes:
          results.driverLicenseDetailedInfo.restrictions ||
          results.barcode.driverLicenseDetailedInfo.restrictions,
        jurisdictionEndorsementCodes:
          results.driverLicenseDetailedInfo.endorsements ||
          results.barcode.driverLicenseDetailedInfo.endorsements,
        dateOfExpiry:
          results.dateOfExpiry.month +
          "/" +
          results.dateOfExpiry.day +
          "/" +
          results.dateOfExpiry.year,
        lastName: results.lastName,
        givenName: results.firstName,
        dateOfIssue:
          results.dateOfIssue.month +
          "/" +
          results.dateOfIssue.day +
          "/" +
          results.dateOfIssue.year,
        dateOfBirth:
          results.dateOfBirth.month +
          "/" +
          results.dateOfBirth.day +
          "/" +
          results.dateOfBirth.year,
        sex: String(results.sex).charAt(0),
        eyeColor: "",
        height: "",
        addressStreet: add_splits[0].trim(),
        addressCity: add_splits[1].trim(),
        addressState: add_splits[2].trim(),
        addressPostalCode: add_splits[3].trim(),
        documentNumber:
          results.documentNumber || results.barcode.documentNumber,
        documentDiscriminator: "xxxxx",
        issuer: results.issuingAuthority || results.barcode.issuingAuthority,
      };
      const res = await updateLicense(info);
      if (res && res.status === 200) {
        if (res.data && res.data.status) return true;
        showMessage(res.data.message);
        return false;
      }
      showMessage("Sorry! Failed to update your license.");
      return false;
    } catch (err) {
      showFieldError(
        "Failed to parse image. Please upload another images of license.",
        1
      );
      return false;
    }
  };

  const uploadLicenceImage = async (license_no) => {
    const data = {
      doc_type: `license_doc_${license_no}`,
      doc_data: formRef.current.values[`license_doc_${license_no}`],
      fileformat: license_no === 1 ? fileFormatDl1 : fileFormatDl2,
    };

    const res = await uploadLicenseDocument(data);
    if (res && res.status === 200) {
      if (res.data && res.data.status) {
        if (license_no === 1) return true;
        //reload user Data
        refreshUserDetail();
        showMessage(res.data.message);
        return true;
      }
      showMessage(res.data.message);
      return false;
    }
    showMessage(
      "Failed to upload license document. Please try after sometime."
    );
    return false;
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      if (!recognizerRunner) {
        showMessage("Please reload your browser.");
        return;
      }
      if (!front_image_ref.current) {
        setSubmitting(false);
        showFieldError("Please upload license front image", 1);
        return;
      }
      if (!back_image_ref.current) {
        setSubmitting(false);
        showFieldError("Please upload license back image", 2);
        return;
      }
      await front_image_ref.current.decode();
      await back_image_ref.current.decode();
      const frontImageFrame = BlinkIDSDK.captureFrame(front_image_ref.current);
      const backImageFrame = BlinkIDSDK.captureFrame(back_image_ref.current);

      const processResultFrontSide = await recognizerRunner.processImage(
        frontImageFrame
      );

      if (processResultFrontSide !== BlinkIDSDK.RecognizerResultState.Empty) {
        const processResultBackSide = await recognizerRunner.processImage(
          backImageFrame
        );
        if (processResultBackSide !== BlinkIDSDK.RecognizerResultState.Empty) {
          const results = await combinedGenericIDRecognizer.getResult();
          if (results.state !== BlinkIDSDK.RecognizerResultState.Empty) {
            if (
              !results.documentNumber &&
              !(results.barcode && results.barcode.documentNumber)
            ) {
              setSubmitting(false);
              showFieldError(
                "Failed to parse image. Please upload another images of license.",
                1
              );
              return;
            }
            // update license details
            if (await updateLicenseDetails(results)) {
              // upload license 1
              if (await uploadLicenceImage(1)) {
                // upload license 2
                await uploadLicenceImage(2);
                setSubmitting(false);
              } else {
                setSubmitting(false);
              }
            } else {
              setSubmitting(false);
            }
          } else {
            setSubmitting(false);
            showFieldError(
              "Failed to parse image. Please upload clear images of license.",
              1
            );
          }
        } else {
          setSubmitting(false);
          showFieldError("Please upload another image", 2);
        }
      } else {
        setSubmitting(false);
        showFieldError("Please upload another image", 1);
      }
    } catch (err) {
      setSubmitting(false);
      console.log(err);
      setErrorMessage("Sorry! something went wrong.Please reload your page.");
      setIsError(true);
    }
  };

  useEffect(() => {
    if (BlinkIDSDK.isBrowserSupported()) {
      const licenseKey = process.env.REACT_APP_BLINKID;
      const loadSettings = new BlinkIDSDK.WasmSDKLoadSettings(licenseKey);
      loadSettings.engineLocation =
        "https://unpkg.com/@microblink/blinkid-in-browser-sdk@5.12.0/resources/";
      BlinkIDSDK.loadWasmModule(loadSettings).then(
        async (wasmSDK) => {
          // The SDK was initialized successfully, save the wasmSDK for future use
          // setWasmSDKObj(wasmSDK);
          const combinedGenericIDRecognizer = await BlinkIDSDK.createBlinkIdCombinedRecognizer(
            wasmSDK
          );
          const settings = await combinedGenericIDRecognizer.currentSettings();
          settings.allowUncertainFrontSideScan = true;
          await combinedGenericIDRecognizer.updateSettings(settings);
          setCombinedGenericIDRecognizer(combinedGenericIDRecognizer);
          setRecognizerRunner(
            await BlinkIDSDK.createRecognizerRunner(
              wasmSDK,
              [combinedGenericIDRecognizer],
              false
            )
          );
        },
        (error) => {
          setDisableBtn(true);
          // setErrorMessage("Error during the initialization of the SDK!");
          // setIsError(true);
          console.log("Error during the initialization of the SDK!", error);
        }
      );
    } else {
      setDisableBtn(true);
      setErrorMessage(
        "Sorry! please use different web broswer for uploading license"
      );
      setIsError(true);
    }

    return () => {
      if (recognizerRunner) recognizerRunner.delete();
      if (combinedGenericIDRecognizer) combinedGenericIDRecognizer.delete();
    };
  }, []);

  const closeDialog = () => {
    setErrorMessage("");
    setIsError(false);
  };

  const onFileChange = async (e, side) => {
    try {
      if (e.target.files.length > 0) {
        setImageLoadingSide(side);
        const splits = e.target.files[0].name.split(".");
        if (side === 1) setFileFormatDl1(splits[splits.length - 1] || "jpg");
        else setFileFormatDl2(splits[splits.length - 1] || "jpg");
        const compressedFile = await imageCompression(
          e.target.files[0],
          imageCompressOptions
        );
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );
        var reader = new FileReader();
        reader.readAsDataURL(compressedFile);

        reader.onloadend = function() {
          setCurrentImageSide(side);
          setImageLoadingSide(0);
          setCurrentImageToCrop(reader.result);
        };
      }
    } catch (err) {
      setImageLoadingSide(0);
    }
  };

  const onImageCropped = (data) => {
    if (data) {
      if (formRef.current) {
        formRef.current.setFieldValue(`license_doc_${currentImageSide}`, data);
      }
    }
    setCurrentImageSide(null);
    setCurrentImageToCrop(null);
  };

  return (
    <div>
      <Formik
        initialValues={{
          license_doc_1: "",
          license_doc_2: "",
        }}
        validationSchema={uploadLicenseSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        innerRef={formRef}
      >
        {({ errors, touched, submitForm, values }) => (
          <div>
            <div className="account_box">
              <h6 className="blue_text">License Images</h6>
              <div className="row">
                <div className="form-group col-md-6 col-lg-6 col-12">
                  <label className="form_lbl">Front Image</label>

                  <div className="license-upload">
                    {imageLoadingSide === 1 && <Loader />}
                    <div className="license-edit">
                      <input
                        type="file"
                        id="imageUploadDl1"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => onFileChange(e, 1)}
                        onClick={(e) => (e.currentTarget.value = null)}
                      />
                      <label
                        className="d-flex align-items-center justify-content-center"
                        htmlFor="imageUploadDl1"
                      />
                    </div>
                    <div className="license-preview">
                      {values.license_doc_1 ? (
                        <img
                          id="imagePreview1"
                          className="bg-image"
                          src={values.license_doc_1}
                          alt="licence1"
                          ref={front_image_ref}
                        />
                      ) : (
                        <div className="d-flex justify-content-center align-items-center h-100">
                          <p className="text-white">Front Image</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.license_doc_1 && touched.license_doc_1 && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.license_doc_1}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-6 col-lg-6 col-12">
                  <label className="form_lbl">Back Image</label>
                  <div className="license-upload">
                    {imageLoadingSide === 2 && <Loader />}
                    <div className="license-edit">
                      <input
                        type="file"
                        id="imageUploadDl2"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => onFileChange(e, 2)}
                        onClick={(e) => (e.currentTarget.value = null)}
                      />
                      <label
                        className="d-flex align-items-center justify-content-center"
                        htmlFor="imageUploadDl2"
                      />
                    </div>
                    <div className="license-preview">
                      {values.license_doc_2 ? (
                        <img
                          id="imagePreview2"
                          className="bg-image"
                          src={values.license_doc_2}
                          alt="license2"
                          ref={back_image_ref}
                        />
                      ) : (
                        <div className="d-flex justify-content-center align-items-center h-100">
                          <p className="text-white">Back Image</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.license_doc_2 && touched.license_doc_2 && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.license_doc_2}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                onClick={submitForm}
                className="btn update_btn w-100"
                disabled={submitting || disableBtn}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </Formik>
      {isError && <ErrorDialog message={errorMessage} onClose={closeDialog} />}
      {submitting && <Loader />}
      <ImageCropperModal image={currentImageToCrop} onResult={onImageCropped} />
    </div>
  );
};

const mapStateToPops = (state) => {
  const { userLoggedIn } = state.auth;
  return { userLoggedIn };
};

const mapDispatchToPops = (dispatch) => {
  return {
    refreshUserDetail: () => dispatch(loadUserDetail()),
  };
};

export default connect(mapStateToPops, mapDispatchToPops)(UploadLicense);
