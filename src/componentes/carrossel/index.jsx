import './carrossel.css';
import { Swiper, SwiperSlide } from 'swiper/react'

function Carrossel() {

    const data = [
        { id: "1", image: <img src="./597575.jpg" alt="" /> },
        { id: "2", image: <img src="./597575.jpg" alt="" /> },
        { id: "3", image: <img src="./597575.jpg" alt="" /> },
    ]

    return (
        <div>
            <h3 id='maisPedidos'>PRODUTOS</h3>
            <div className='container'>
                <Swiper
                    slidesPerView={1}
                    pagination={{ clickable: true }}>
                    {data.map((item) => (
                        <SwiperSlide key={item.id} className='slide-img'>
                            <img src="/imgs/597575.jpg" alt='' className='slide-item' />
                            <img src="/imgs/597575.jpg" alt='' className='slide-item item2' />
                            <img src="/imgs/597575.jpg" alt='' className='slide-item' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
export default Carrossel;