import SimpleImageSlider from "react-simple-image-slider";
import wifflepic from "../Assets/wifflepic.jpeg";
import swing from "../Assets/swing.jpeg";
import field from "../Assets/field.jpeg";
import fielders from "../Assets/fielders.jpeg";
import outfield from "../Assets/outfield.jpeg";
import scoreboard from "../Assets/scoreboard.jpeg";
import scoreboard2 from "../Assets/scoreboard2.jpeg";
import thumbsup from "../Assets/thumbsup.jpeg";

const images = [
  { url: `${swing}` },
  { url: `${wifflepic}` },
  { url: `${field}` },
  { url: `${fielders}` },
  { url: `${outfield}` },
  { url: `${scoreboard}` },
  { url: `${scoreboard2}` },
  { url: `${thumbsup}` },
];

// need media queieres for height on wider screens
const ImageSlider = () => {
  return (
    <div>
      <SimpleImageSlider
        height={"45vh"}
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
