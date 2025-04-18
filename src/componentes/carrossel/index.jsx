import React from "react";
import "./carrossel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Importe os estilos necessários do Swiper
import "swiper/css";
import "swiper/css/pagination";

function Carrossel() {
  const data = [
    { id: "1", image: "/imgs/597575.jpg" },
    { id: "2", image: "/imgs/597575.jpg" },
    { id: "3", image: "/imgs/597575.jpg" },
  ];

  return (
    <div>
      <h3 id="maisPedidos">PRODUTOS</h3>
      <div className="container">
        <Swiper
          slidesPerView={1}
          // Altere o efeito para 'slide' para uma transição suave
          effect={"slide"}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className="slide-img">
              <img src={item.image} alt="" className="slide-item" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Carrossel;
