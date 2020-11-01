import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Car from './car'
import Speed from './speed'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {Power1} from 'gsap'
import { Box2 } from 'three';

function App() {
  let slides_container = useRef(null)

  let slide1_content = useRef(null)
  let slide1_title = useRef(null)
  let slide1_line = useRef(null)
  let slide1_caption = useRef(null)

  let credits = useRef(null)

  let slide2_h1 = useRef(null)
  let slide2_p = useRef(null)

  let slide3_inner = useRef(null)
  let slide3_h1 = useRef(null)

  let slide4_h1 = useRef(null)

  let slide5_content = useRef(null)

  //let colorLogo = useRef(null)

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger); 
  }

  let [vroom, setVroom] = useState(false);

  const vroomToggle = () => {
    // How?
  }

  useEffect(() => {
    gsap.to(slides_container, {duration: 0, css: {visibility: "visible"}})
    // Animation jizz

    /* gsap.fromTo(colorLogo, {
      color: function(index, target, targets) {
        return "hsl(" + ((index / targets.length) * 360) + ", 100%, 80%)";
      }
    },{
      color: "hsl(+=360, +=0%, +=0%)",
      duration: 4,
      repeat: -1,
      ease: "none"
    }); */

    let slides = gsap.utils.toArray(".slide")

    let slide = new gsap.timeline()
    slide
    .from("#slide2", {xPercent: 100})
    .from("#slide3", {yPercent: 100})
    .from("#slide4", {xPercent: 100})
    .from("#slide5", {yPercent: 100})

    let slide_anim = new gsap.timeline({
      duration: 1,
      scrollTrigger: {
          trigger: "#slide2",
          endTrigger: "#slide5",
          start: "top center",
          end: "+=5000",
          scrub: 1
      }
    })
    ScrollTrigger.defaults({
      immediateRender: false,
      ease: Power1.inOut
    })
    slide_anim
    .add("slide1", 0)
    .add("slide2", 10)
    .add("slide3", 20)
    .add("slide4", 30)
    .add("slide5", 40)

    ScrollTrigger.create({
      animation: slide,
      trigger: ".slides",
      start: "top top",
      end: "+=5000",
      scrub: 1,
      snap: 1 / (slides.length - 1),
      pin: true,
      anticipatePin: 1
    })
    // Slide 1
    gsap.fromTo(slide1_title, {x: -100, opacity: 0}, {x: 0, opacity: 1, delay: .6})
    gsap.to(slide1_line, {width: "100%", delay: .6})
    gsap.fromTo(slide1_caption, {y: -15, opacity: 0}, {y: 0, opacity: 1, delay: 1.6})
    slide_anim.to(slide1_content, {opacity: 0, x: "-100%", scrollTrigger: {
      trigger: "#slide1",
      start: "+=10",
      scrub: 1,
    }}, "slide1")
    slide_anim.to(credits, {y: 100, scrollTrigger: {
      trigger: "#slide1",
      start: "+=10",
      scrub: 1,
    }}, "slide1")
    // Slide 2
    slide_anim.to(slide2_h1, {opacity: 1, y: 50, delay: .2, scrollTrigger: {
      trigger: "#slide2",
      start: "+=1000",
      scrub: 1,
    }}, "slide2")
    slide_anim.to(slide2_p, {opacity: 1, y: 70, delay: 1, scrollTrigger: {
      trigger: "#slide2",
      start: "+=1000",
      scrub: 1,
    }}, "slide2")
    // Slide 3
    slide_anim.to(slide3_inner, {opacity: 1, scrollTrigger: {
      trigger: "#slide3",
      start: "+=1000",
      scrub: 1,
    }}, "slide3")
    slide_anim.to(slide3_h1, {y: -15, opacity: 1, scrollTrigger: {
      trigger: "#slide3",
      start: "+=1000",
      scrub: 1,
    }}, "slide3")
    // Slide 4
    slide_anim.to(slide4_h1, {opacity: 1, scrollTrigger: {
      trigger: "#slide4",
      start: "+=1000",
      scrub: 1
    }}, "slide4")
    //slide 5
    gsap.to(slide5_content, {opacity: 1, scrollTrigger: {
      trigger: "#slide5",
      start: "+=1000",
      scrub: 1
    }}, "slide5")
  }, [])
  return (
    <>
      
      <div className="slides" ref={el => {slides_container = el}}>
        <Car />
        <section className="slide" id="slide1" ref={el => {slide1_content = el}}>
          <div className="slide-inner">
            <div className="title">
              <h1 ref={el => {slide1_title = el}}>Car</h1>
              <hr ref={el => {slide1_line = el}}></hr>
              <p ref={el => {slide1_caption = el}}>Oh my word, it's a car!</p>
            </div>
            <p className="mob-text">Just start scrolling!</p>
            <div className="credits" ref={el => {credits = el}}>
              <p>Site made by <a href="https://tonycre8.co.uk">Tony Ingall (Otherwise known as TONYCRE8)</a>, <br></br>
                 Original model made by <a href="https://free3d.com/user/issamchentoui">Issam</a>.
              </p>
            </div>
          </div>
        </section>
        <section className="slide" id="slide2">
          <div className="slide-inner">
            <div className="title">
              <h1 ref={el => {slide2_h1 = el}}>The pinnacle of design</h1>
              <p ref={el => {slide2_p = el}}>Classic, sophisticated and elegant shape. Aerodynamics? Coming in version 0.2!</p>
            </div>
            {/*<button class="button" onClick={vroomToggle}>
              Car go vroom?
            </button>*/}
          </div>
        </section>
        <section className="slide" id="slide3">
          <div className="slide-inner" ref={el => {slide3_inner = el}}>
            <h1 ref={el => {slide3_h1 = el}}>Masterful enginuity</h1>
            <p>Look at the underside of that thing. So... <i>smooth?</i></p>
          </div>
        </section>
        <section className="slide" id="slide4">
          <div className="slide-inner">
            <div id="left">
              <Speed />
            </div>
            <div id="right">
              <h1 ref={el => {slide4_h1 = el}}>Power unleashed</h1>
              <p>Rarrr, look at that - power.. mm, yeah..?</p>
            </div>
          </div>
        </section>
        <section className="slide" id="slide5" ref={el => {slide5_content = el}}>
          <div className="slide-inner">
            <div>
              <h2>It could be yours,</h2>
              <h1>TODAY</h1>
              <small>"Today" but smaller</small>
            </div>
            <div className="cta">
              <a className="button" href="https://www.youtube.com/watch?v=LErgmHmPLmw">BUY</a>
            </div>
            <div/>
            <div/>
          </div>
        </section>
      </div>
      {/* <div id="rc">
        <h1 id="colorful" ref={el => {colorLogo = el}}>8</h1>
        <div class="newlogo">
          <h1>CR</h1>
          <h1>E⠀</h1>
        </div>
      </div> */}
    </>
  );
}

export default App;