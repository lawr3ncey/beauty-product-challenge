import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import "../styles/HeroSlider.css";


const slides = [
  {
    title: "روغن زیتون",
    image: "/images/beauty-product(2).png",
    background: "radial-gradient(circle, rgb(223, 79, 79) 0%, rgb(151, 12, 12) 100%)",
    effectImage: "/images/floating-petals.png",
  },

  {
    title: "صابون زیتون",
    image: "/images/beauty-product.png",
    background: "radial-gradient(circle, rgb(211 211 201) 0%, rgb(247 182 176) 100%)",
    effectImage: "/images/floating-bubbles.png",
  },

  {
    title: "روغن کنجد",
    image: "/images/beauty-product(1).png",
    background: "radial-gradient(circle, #ffffff 0%, rgb(177 177 180) 100%)",
    effectImage: "/images/floating-cream.png",
  }
];

const HeroSlider = () => {
  return (
    <div className="hero-slider-wrapper">
      <Swiper
        direction="vertical"
        modules={[Pagination, Mousewheel]}
        pagination={{ clickable: true }}
        mousewheel={{ forceToAxis: true }}
        loop={true}
        speed={1000} // 1s transition
        className="hero-swiper"
        onSlideChange={(swiper) => {
          if (!swiper || typeof swiper.activeIndex === "undefined") return;

          const prevSlide = swiper.slides[swiper.previousIndex];
          const currentSlide = swiper.slides[swiper.activeIndex];
          
          const prevProduct = prevSlide?.querySelector(".product-img");
          const currProduct = currentSlide?.querySelector(".product-img");

          // EXIT animations (old slide) 
          if (prevSlide) {
            prevSlide.querySelectorAll(".petal img, .splash img").forEach((el, i) => {
              el.classList.remove("petal-enter", "splash-enter");
              void el.offsetWidth; // force reflow
              el.classList.add("petal-exit", "splash-exit");
              el.style.animationDelay = `${i * 0.2}s`;
            });

            // product EXIT (slide down)
            if (prevProduct) {
              prevProduct.classList.remove("product-enter");
              void prevProduct.offsetWidth; // reflow
              prevProduct.classList.add("product-exit"); // <-- will use slideDown keyframes

              // When product exit finishes → trigger enter animations
              prevProduct.addEventListener(
                "animationend",
                () => {
                  if (!currentSlide) return;

                  // petals & splashes ENTER
                  currentSlide.querySelectorAll(".petal img, .splash img").forEach((el, i) => {
                    el.classList.remove("petal-exit", "splash-exit");
                    void el.offsetWidth; // force reflow
                    el.classList.add("petal-enter", "splash-enter");
                    el.style.animationDelay = `${i * 0.2}s`;
                  });

                  // product ENTER (slide from top)
                  if (currProduct) {
                    currProduct.classList.remove("product-exit");
                    void currProduct.offsetWidth; // reflow
                    currProduct.classList.add("product-enter"); // <-- will use slideIn keyframes

                    // Re-trigger floating animation AFTER slide-in finishes
                    currProduct.addEventListener(
                      "animationend",
                      () => {
                        currProduct.classList.remove("floating-product");
                        setTimeout(() => {
                          currProduct.classList.add("floating-product");
                        }, 100);
                      },
                      { once: true }
                    );
                  }
                },
                { once: true }
              );
            }
          }
        }}
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <section className="hero-slide relative" style={{ background: slide.background }}>
                
                {/* Floating Foreground Effects */}
                <div className="petal petal-1">
                  <img src={slide.effectImage} alt="Effect 1" className="petal-enter" />
                </div>

                {/* Background Splash Effects */}
                <div className="splash splash-1">
                  <img src={slide.effectImage} alt="Effect splash 1" className="petal-enter" />
                </div>
                
                <div className="splash splash-2">
                  <img src={slide.effectImage} alt="Effect splash 2" className="petal-exit" />
                </div>

                 {/* Title */}
                <h1 className="hero-title z-10">{slide.title}</h1>

                {/* Product Image */}
                <div className="product-wrapper z-20">
                  <img src={slide.image} alt="Product" className="product-img floating-product" />
                  <div className="product-shadow"></div>
                </div>
              </section>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* CTA Button */}
      <button className="cta-button">
        مشاهده دسته بندی
      </button>
    </div>
  );
};

export default HeroSlider;
