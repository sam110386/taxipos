import React, { useEffect } from "react";

const ImageModal = (images, onClose) => {
  useEffect(() => {
    window.initImagesCarousal();
  }, []);

  if (!images) return null;

  return (
    <div className="dialog-wrapper">
      <div className="align-items-center justify-content-center image-dialog-container position-relative">
        <button
          type="button"
          className="modal-close-btn close"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="dialog-body owl_slider py-2 px-2">
          <div id="imagescarousel" className="owl-carousel owl-theme">
            {images &&
              images.map((el, i) => (
                <div className="item" key={"image-" + i}>
                  <img
                    src={el.file}
                    alt=""
                    // key={`slide-image-` + i}
                    style={{
                      height: "80vh",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
