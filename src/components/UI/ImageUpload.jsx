import { openUploadWidget } from "../../utils/CloudinaryService";

const ImageUpload = (props) => {
  const uploadImageWidget = () => {
    console.log(props);
    let myUploadWidget = openUploadWidget(
      {
        cloudName: props.cloud_name,
        uploadPreset: props.upload_preset,
        tags: ["myname"],
        maxImageWidth: 600,
        sources: ["local", "url", "camera"],
        maxFiles: 1,
        accept: 'image/*',
      },
      function (error, result) {
        if (!error && result.event === "success") {
          props.onImageUpload(result.info.public_id);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="my-2 p-2 bg-green-700 rounded border text-white greenButton" onClick={uploadImageWidget}>
      Upload Image
    </button>
  );
};

export default ImageUpload;
