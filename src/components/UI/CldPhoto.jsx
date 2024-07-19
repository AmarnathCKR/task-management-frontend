import { AdvancedImage, lazyload } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { Cloudinary } from "@cloudinary/url-gen";

const CldPhoto = (props) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: props.cloudName
    }
  });

  const myImage = cld.image(props.publicId);
  myImage.resize(fill().width(250).height(250)).delivery(quality(60));

  return <AdvancedImage cldImg={myImage} plugins={[lazyload()]} />;
};

export default CldPhoto;
