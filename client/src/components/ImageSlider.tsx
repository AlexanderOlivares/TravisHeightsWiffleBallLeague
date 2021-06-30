import SimpleImageSlider from "react-simple-image-slider";
import wifflepic from "../Assets/wifflepic.jpeg";

const images = [{ url: `${wifflepic}` }];

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
