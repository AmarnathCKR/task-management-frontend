import { openUploadWidget } from "../../utils/CloudinaryService";
import { CiEdit } from "react-icons/ci";

const ImageUpload = (props) => {
  const uploadImageWidget = () => {

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
          props.onImageUpload(result.info.secure_url);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="my-2 p-2 bg-green-700 rounded border text-white greenButton" onClick={uploadImageWidget}>
      <CiEdit />
    </button>
  );
};

export default ImageUpload;
