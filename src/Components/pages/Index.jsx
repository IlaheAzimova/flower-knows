import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Mousewheel, Navigation } from 'swiper/modules';
import { Link } from 'react-router';
import Bestsellers from '../common/BestSellers.jsx'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../App.css'
import hero1 from '../../assets/img/hero1.webp';
import hero2 from '../../assets/img/hero2.webp';
import hero3 from '../../assets/img/hero3.webp';
import desktop1 from '../../assets/img/desktop1.webp';
import desktop2 from '../../assets/img/desktop2.webp';
import desktop3 from '../../assets/img/desktop3.webp';
import ReadyToGift from '../common/ReadyToGift.jsx';
import reward from '../../assets/img/reward.webp';
import events from '../../assets/img/events.webp';
import PreviousCollections from '../common/PreviousCollections.jsx';
import Newsletter from '../common/Newsletter.jsx';
import Unicorn from '../common/Unicorn.jsx';
import LimitedSale from '../common/LimitedSale.jsx';



function Index() {

    return (
        <>
            <section>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="heroSwiper"
                >

                    <SwiperSlide>
                        <div className="relative md:text-left w-full h-[65vh] min-h-[420px] md:h-[90vh]  bg-[#141a35] overflow-hidden">
                            <div className="md:hidden">
                                <img
                                    src={hero1}
                                    alt="Knight Unicorn Collection"
                                    className="absolute w-full h-full object-cover"
                                />
                            </div>
                            <div className="hidden md:block">
                                <img
                                    src={desktop1}
                                    alt="Knight Unicorn Collection"
                                    className="absolute inset-0 w-full h-full object-cover "
                                />

                            </div>

                            <div className="flex items-center">
                                <div className="w-[90%] mx-auto">
                                    <div className="max-w-[560px] relative">
                                        <div className='absolute top-10 md:top-80 xl:top-60'>
                                            <h2 className={`font text-[34px]  md:text-[48px] leading-[1.1] mb-5 md:mb-7 text-white`}>
                                                Knight Unicorn
                                            </h2>

                                            <div className="mb-7 md:mb-9">

                                                <p

                                                    className="font text-[1rem] md:text-[1.2rem]  tracking-[1.5px] leading-[2.2] text-white"
                                                >
                                                    Unlock little treasures along your journey — gifts,rewards, and more await.
                                                </p>

                                            </div>


                                        </div>
                                        <div className='absolute top-100 left-0 right-0 md:top-140 xl:top-110'>
                                            <Link
                                                to="/collections/knight-unicorn-collection"
                                                className={`inline-block bg-white text-[#3f3c39] font-[600] font uppercase text-[14px]  tracking-[2.5px]  px-8 py-3  transition-opacity duration-300 hover:opacity-80 `}
                                            >
                                                Shop Now
                                            </Link>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative md:text-left w-full h-[65vh] min-h-[420px] md:h-[90vh]  bg-[#141a35] overflow-hidden">
                            <div className='md:hidden '>
                                <img
                                    src={hero2}
                                    alt="Knight Unicorn Collection"
                                    className="absolute inset-0 w-full h-full object-cover  "
                                />

                            </div>
                            <div className='hidden md:block'>
                                <img
                                    src={desktop2}
                                    alt="Knight Unicorn Collection"
                                    className="absolute inset-0 w-full h-full object-cover "
                                />

                            </div>

                            <div className="flex items-center">
                                <div className="w-[90%] mx-auto">
                                    <div className="max-w-[560px] relative">
                                        <div className='absolute top-60 left-0 right-0 xl:top-70 '>
                                            <h2 className={`font text-[34px]  md:text-[48px]  leading-[1.1] mb-5 md:mb-7 text-white`}>
                                                Knight Unicorn
                                            </h2>

                                            <div className="mb-7 md:mb-9">

                                                <p

                                                    className="font text-[1rem] md:text-[1.1rem] tracking-[1.5px] leading-[1.5] text-white"
                                                >
                                                    Unicorn soul, Knight's heart.<br />
                                                    Be your own knight, rule your light.<br />
                                                    Brave one, crown yourself.
                                                </p>

                                            </div>
                                            <Link
                                                to="/collections/knight-unicorn-collection"
                                                className={`inline-block bg-white text-[#3f3c39] font-[600] font uppercase text-[14px]  tracking-[2.5px] px-8 py-3  transition-opacity duration-300 hover:opacity-80 `}
                                            >
                                                Shop Now
                                            </Link>



                                        </div>





                                    </div>
                                </div>
                            </div>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full h-[65vh] min-h-[420px] md:h-[90vh]  bg-[#141a35] overflow-hidden">
                            <div className="md:hidden">
                                <img
                                    src={hero3}
                                    alt="Make Every Gift a Fairytale"
                                    className="absolute inset-0 w-full h-full object-cover  "
                                />

                            </div>
                            <div className="hidden md:block">
                                <img
                                    src={desktop3}
                                    alt="Make Every Gift a Fairytale"
                                    className="absolute inset-0 w-full h-full object-cover  "
                                />

                            </div>



                            <div className="  flex items-center ">
                                <div className="w-[90%] mx-auto">
                                    <div className="max-w-[560px] md:max-w-[700px] mx-auto relative">
                                        <div className='absolute top-10 left-0 right-0 md:top-140 xl:top-100'>
                                            <h2 className={`font text-[34px] md:text-[48px] leading-[1.1] mb-5 md:mb-7 text-white`}>
                                                Make Every Gift a Fairytale
                                            </h2>

                                            <div className="mb-7 md:mb-9">

                                                <p

                                                    className="font text-[1rem] md:text-[1.2rem] tracking-[1.5px] leading-[1.1] text-white"
                                                >
                                                    Turn your wishlist into wonder —
                                                    shop dreamy deals up to <span className='font-[600]'>40% off</span>
                                                </p>

                                            </div>


                                        </div>
                                        <div className='absolute top-105 md:top-190 left-0 right-0 xl:top-140'>
                                            <Link
                                                to="/collections/limited-set"
                                                className={`inline-block bg-white text-[#3f3c39] font-[600] font uppercase text-[14px]  tracking-[2.5px] px-8 py-3  transition-opacity duration-300 hover:opacity-80 `}
                                            >
                                                Make a Wish
                                            </Link>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                    </SwiperSlide>

                </Swiper>
            </section>
            <Unicorn />
            <Bestsellers />
            <ReadyToGift />
            <section className='my-5'>
                <div className="flex flex-col lg:flex-row-reverse">
                    <div className='lg:w-[50%]'>
                        <img src={reward} alt="Get rewarded while you shopping" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-[#fbf0f1] lg:w-[50%] flex items-center">
                        <div className="text w-[90%] lg:w-[80%] mx-auto py-12 flex flex-col">
                            <span className='dmsans uppercase text-[#212326b3] text-[1rem] lg:text-[1.2rem] tracking-[1.5px]'>Join with 100 points</span>
                            <span className='font capitalize text-[#212326] text-[1.4rem] lg:text-[2rem] tracking-[1.5px] mt-3 mb-8'>Get rewarded while you shop</span>
                            <Link
                                to="/collections/knight-unicorn-collection"
                                className="block w-[40%] text-center bg-[#e8989a] text-white dmsans uppercase text-[13px] tracking-[3px] py-3 transition-colors duration-300 hover:bg-[#b9788a]"
                            >
                                Join Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <LimitedSale />
            <section className='events my-5'>
                <div className="flex flex-col lg:flex-row">
                    <div className='lg:w-[50%]'>
                        <img src={events} alt="Flower knows events" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-[#fbf0f1] lg:w-[50%] flex items-center">
                        <div className="text w-[90%] lg:w-[80%] mx-auto py-12 flex flex-col">
                            <span className='dmsans capitalize text-[#212326b3] text-[1rem] tracking-[1.5px]'>Flower Knows Events</span>
                            <span className='font capitalize text-[#212326] text-[1.4rem] lg:text-[1.8rem] tracking-[1.4px] mt-3 mb-8'>Connections and Exclusive Events Await - Let's Celebrate Beauty Together!</span>
                            <Link
                                to="/collections/knight-unicorn-collection"
                                className="block w-full lg:w-[40%] text-center bg-[#e8989a] text-white dmsans uppercase text-[13px] tracking-[3px] py-3 transition-colors duration-300 hover:bg-[#b9788a]"
                            >
                                Explore
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <PreviousCollections />
            <section>
                <div className="logos flex flex-wrap justify-center items-center gap-6 pb-5 ">
                    <Link to="https://www.vogue.com/business/story/beauty/inside-the-chinese-beauty-boom" target='blank'>
                        <img src="https://flowerknows.co/cdn/shop/files/Vogue.png?v=1731216455&width=750" alt="" className='w-[150px]' />
                    </Link>
                    <Link to=""><img src="https://flowerknows.co/cdn/shop/files/Elle-2.png?v=1731216263&width=750" alt="" className='w-[150px]' /></Link>
                    <Link to="https://www.dailymail.com/lifestyle/article-13285015/Lana-Del-Rey-core-trends-Coachella-Arts-Music-Festival.html" target='blank'><img src="https://flowerknows.co/cdn/shop/files/Daily_Mail_def26641-58cd-4ec3-8628-1557788f8f65.png?v=1731216533&width=750" alt="" className='w-[150px]' /></Link>
                    <Link to="https://www.beautyindependent.com/popular-chinese-cosmetics-brand-flower-knows-makes-us-retail-debut/" target='blank'><img src="https://flowerknows.co/cdn/shop/files/Beauty_Independent_92f1c1d5-636c-4016-8b86-dbbd4fe27c33.png?v=1731216616&width=750" alt="" className='w-[150px]' /></Link>
                    <Link to="https://www.usmagazine.com/shop-with-us/news/lana-del-rey-lip-plumper/" target='blank'><img src="https://flowerknows.co/cdn/shop/files/US_Weekly.png?v=1731216354&width=750" alt="" className='w-[150px]' /></Link>
                    <Link to="https://www.teenvogue.com/story/new-makeup-trends-to-try" target='blank'><img src="https://flowerknows.co/cdn/shop/files/img_v3_02i2_7cef1ae4-9a28-4f74-8c44-2e718591aefg_e4345d21-e581-402a-a5ea-329d9f41f5ed.png?v=1735549149&width=750" alt="" className='w-[150px]' /></Link>

                </div>
            </section>
            <Newsletter />



        </>

    )

}

export default Index; 