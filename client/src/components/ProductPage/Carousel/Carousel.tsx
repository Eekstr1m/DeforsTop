import { Options, Splide, SplideSlide } from "@splidejs/react-splide";
import s from "./Carousel.module.scss";
import Image from "../../common/Image/Image";
import React from "react";

export default function Carousel({
  hideThumb,
  thumbnail,
}: {
  hideThumb: boolean;
  thumbnail: string;
}) {
  const mainRef = React.createRef<Splide>();
  const thumbsRef = React.createRef<Splide>();

  React.useEffect(() => {
    if (thumbsRef.current?.splide !== undefined) {
      mainRef.current?.sync(thumbsRef.current?.splide);
    }
  }, [mainRef, thumbsRef]);

  //   const renderSlides = () => {
  //     return slides.map((slide) => (
  //       <SplideSlide key={slide.src}>
  //         <img src={slide.src} alt={slide.alt} />
  //       </SplideSlide>
  //     ));
  //   };

  const mainOptions: Options = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    pagination: false,
    gap: "20px",
    breakpoints: {
      1200: {
        height: "100%",
      },
      767: {
        pagination: true,
      },
    },
  };

  const thumbOptions: Options = {
    type: "slide",
    rewind: true,
    gap: "20px",
    pagination: false,
    fixedWidth: 100,
    cover: true,
    focus: "center",
    isNavigation: true,
  };

  return (
    <div className={s.image}>
      {/* Carousel */}
      <Splide
        options={mainOptions}
        ref={mainRef}
        aria-labelledby="thumbnail-slider-example"
      >
        {/* {renderSlides()} */}
        <SplideSlide className={s.splide__slide}>
          <Image thumbnail={thumbnail} />
        </SplideSlide>
      </Splide>
      {/*  */}
      <Splide
        className={hideThumb ? s.thumbSplide : undefined}
        options={thumbOptions}
        ref={thumbsRef}
        aria-label="My Favorite Images"
      >
        {/* {renderSlides()} */}
        <SplideSlide>
          <Image thumbnail={thumbnail} />
        </SplideSlide>
      </Splide>
      {/*  */}
    </div>
  );
}
