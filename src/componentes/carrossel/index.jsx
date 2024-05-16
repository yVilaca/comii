import './carrossel.css';
import { Swiper, SwiperSlide } from 'swiper/react'

function Carrossel() {

    const data = [
        { id:"1", image: <img src="./carssel.jpg" alt="" />},
        { id:"2", image: <img src="./carssel.jpg" alt="" />},
        { id:"3", image: <img src="./carssel.jpg" alt="" />},
    ]

    return(
        <div>
             <h3 id='maisPedidos'>Produtos</h3>
            <div className='container'>
                <Swiper
                slidesPerView={1}>
                    {data.map( (item) => (
                    <SwiperSlide key={item.id} className='slide-img'>
                        <img src="./imgs/carssel.jpg" alt='' className='slide-item'/>
                        <img src="./imgs/carssel.jpg" alt='' className='slide-item'/>
                        <img src="./imgs/carssel.jpg" alt='' className='slide-item'/>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
export default Carrossel;