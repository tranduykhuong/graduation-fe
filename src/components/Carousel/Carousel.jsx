import './Carousel.css'

const Carousel = () => {

   return (
      <section className='flex justify-center items-baseline relative m-auto z-40 h-[300px] pt-12 overflow-hidden lg:w-full md:h-[470px] lg:h-[450px] lg:pt-6 '>
         <img src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2F20127539.jpg?alt=media" className="pic01" loading="lazy" />
         <img src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fanhkhoi.jpg?alt=media" className="pic02" loading="lazy" />
         <img src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fminhthu.jpg?alt=media" className="pic03" loading="lazy" />
         <img src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2F_MG_0818-min.jpg?alt=media" className="pic04" loading="lazy" />
         <img src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fconghau.jpg?alt=media" className='pic05' loading="lazy" />
      </section>
   )
}

export default Carousel
