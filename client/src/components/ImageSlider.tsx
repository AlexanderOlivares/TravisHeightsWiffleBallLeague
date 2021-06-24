import SimpleImageSlider from "react-simple-image-slider";
import bgPhoto from "../Assets/bgPhoto.jpeg";
import bgPhoto2 from "../Assets/bgPhoto2.jpeg";
import chainlink from "../Assets/chainlink.jpeg";
import wiffleBall from "../Assets/wiffleBall.png";
import wiffleBall2 from "../Assets/wiffleBall2.png";

const images = [
  { url: `${chainlink}` },
  { url: `${bgPhoto}` },
  { url: `${bgPhoto2}` },
  { url: `${wiffleBall}` },
  { url: `${wiffleBall2}` },
];

const ImageSlider = () => {
  return (
    <div>
      <SimpleImageSlider
        height={"60vh"}
        width={"90vw"}
        images={images}
        slideDuration={0.5}
        showNavs={true}
        showBullets={true}
      />
    </div>
  );
};

export default ImageSlider;
