import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Link } from "@mui/material";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

// Define the shape of each carousel item
interface CarouselItem {
  Link: string;
  Image: string;
  Name?: string;
}

// Props interface
interface FooterCarouselProps {
  data?: CarouselItem[];
}

const FooterCarousel: FC<FooterCarouselProps> = ({ data = [] }) => {
  const navigate = useNavigate();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    e.preventDefault();
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

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
    <Slider {...settings}>
      {data.map((item, i) => (
        <div className="mx-1" key={i}>
          <div className="bg-white text-center rounded-xl mx-2">
            <Box className="mt-2 overflow-hidden cursor-pointer flex items-center justify-center">
              <Link
                href={item.Link}
                target={item.Link.startsWith("http") ? "_blank" : undefined}
                className="bg-white rounded-xl bottom-img"
                aria-label={item.Name || `Carousel Image ${i}`}
                onClick={(e) => handleClick(e, item.Link)}
              >
                <img
                  src={item.Image}
                  className="mx-auto rounded-2xl"
                  alt={item.Name || ""}
                />
              </Link>
            </Box>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default FooterCarousel;
