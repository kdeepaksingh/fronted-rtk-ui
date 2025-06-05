import { Box, Link } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RouterUtils } from "../../utils/RouterUtils";
import colors from "../../color";

type FooterCarouselItem = {
  Link: string;
  Image: string;
  Name?: string;
};

interface FooterCarouselProps {
  data?: FooterCarouselItem[];
}

const FooterCarousel = ({ data = [] }: FooterCarouselProps) => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box className="px-2">
      <Slider {...settings}>
        {data.map((item, i) => (
          <div key={i} className="mx-1">
            <div
              className={`text-center rounded-xl mx-2`}
              style={{ backgroundColor: colors["ui-white"] }}
            >
              <Box className="mt-2 overflow-hidden cursor-pointer flex items-center justify-center">
                <Link
                  href={item?.Link}
                  target="_blank"
                  aria-label={item?.Name || "Carousel Image " + i}
                  onClick={(e) => {
                    e.preventDefault();
                    RouterUtils.confirmAndRedirect(item?.Link);
                  }}
                  className="inline-block rounded-xl"
                  style={{ backgroundColor: colors["ui-white"] }}
                >
                  <img
                    src={item?.Image}
                    alt={item?.Name || ""}
                    className="block mx-auto rounded-2xl"
                  />
                </Link>
              </Box>
            </div>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default FooterCarousel;
