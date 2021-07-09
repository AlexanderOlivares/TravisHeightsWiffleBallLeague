import SimpleImageSlider from "react-simple-image-slider";
import swing from "../Assets/swing.jpeg";
import fielders from "../Assets/fielders.jpeg";
import thumbsup from "../Assets/thumbsup.jpeg";
import actionshot from "../Assets/actionshot.jpeg";
import emptyfield from "../Assets/emptyfield.jpeg";

const images = [
  { url: `${swing}` },
  { url: `${emptyfield}` },
  { url: `${actionshot}` },
  { url: `${fielders}` },
  { url: `${thumbsup}` },
];

interface ImageSliderProps {
  mobileViewPort: boolean;
  wideViewPort: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  mobileViewPort,
  wideViewPort,
}) => {
  return (
    <SimpleImageSlider
      height={mobileViewPort ? "50vh" : "95vh"}
      alt="wiffleball pics"
      width={"90vw"}
      // conditional for images (to be added) that are "ultra-wide safe"
      images={wideViewPort ? images : images}
      slideDuration={0.5}
      showNavs={true}
      showBullets={true}
    />
  );
};

export default ImageSlider;
