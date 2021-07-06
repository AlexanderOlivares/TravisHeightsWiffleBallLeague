import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import wifflepic from "../Assets/wifflepic.jpeg";
import swing from "../Assets/swing.jpeg";
import field from "../Assets/field.jpeg";
import fielders from "../Assets/fielders.jpeg";
import outfield from "../Assets/outfield.jpeg";
import scoreboard from "../Assets/scoreboard.jpeg";
import scoreboard2 from "../Assets/scoreboard2.jpeg";
import thumbsup from "../Assets/thumbsup.jpeg";
import GlobalStyles from "./GlobalStyles";

interface onMobile {
  mobileViewPort: boolean;
}

const ImageSwiper: React.FC<onMobile> = ({ mobileViewPort }): JSX.Element => {
  console.log(mobileViewPort);
  return (
    <div>
      <Swiper
        style={GlobalStyles.swiper}
        // height={50}
        // autoWidth={true}
        // spaceBetween={50}
        // slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={swiper => console.log(swiper)}
      >
        <SwiperSlide>
          <img width={mobileViewPort ? "400px" : "800px"} src={wifflepic}></img>
        </SwiperSlide>
        <SwiperSlide>
          <img width={mobileViewPort ? "400px" : "800px"} src={field}></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            width={mobileViewPort ? "400px" : "800px"}
            src={scoreboard}
          ></img>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
