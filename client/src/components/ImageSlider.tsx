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

interface onMobile {
  mobileViewPort: boolean;
}

// need media queieres for height on wider screens
const ImageSlider: React.FC<onMobile> = ({ mobileViewPort }) => {
  return (
    <div>
      <SimpleImageSlider
        height={mobileViewPort ? "50vh" : "90vh"}
        alt="wiffleball pics"
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
