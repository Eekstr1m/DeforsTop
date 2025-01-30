import CustomImage from "../../common/Image/Image";
import s from "./Carousel.module.scss";
import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import required modules
import { Navigation, Thumbs } from "swiper/modules";

export default function ImageCarousel({ thumbnail }: { thumbnail: string[] }) {
  const swiperRef = useRef<SwiperType>();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

  return (
    <div style={{ position: "relative" }}>
      {thumbnail.length > 1 ? (
        <>
          <Swiper
            effect={"cards"}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            navigation={{
              nextEl: s.next,
              prevEl: s.prev,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            loop={true}
          >
            {thumbnail.map((slide) => (
              <SwiperSlide key={slide}>
                <CustomImage thumbnail={slide} />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={3}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className={s.mySwiper}
          >
            {thumbnail.map((slide) => (
              <SwiperSlide key={slide}>
                <CustomImage thumbnail={slide} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className={s.prev}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <i className="fa-solid fa-chevron-left fa-2xl"></i>
          </div>
          <div
            className={s.next}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <i className="fa-solid fa-chevron-right fa-2xl"></i>
          </div>
        </>
      ) : (
        <CustomImage thumbnail={thumbnail[0]} />
      )}
    </div>
  );
}
