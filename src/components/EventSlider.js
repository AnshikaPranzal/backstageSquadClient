import React, { useState } from 'react';
import { Button } from "@mui/material";
import '../style/EventSlider.scss';
import { getAllEventList, getAllSpeakerList, getAllVenueList } from '../apicalls';
import { API } from '../backend';
import { Link } from 'react-router-dom';
import { storeAllEvents, storeAllSpeakers, storeAllVenues } from '../action/action';
import { useDispatch, useSelector } from 'react-redux';

const slideData = [
    {
      index: 0,
      headline: 'New Fashion Apparel',
      button: 'View',
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg'
    },
    {
      index: 1,
      headline: 'In The Wilderness hguhguyg ugeduegf uh jjgghghg In The Wilderness hguhguyg ugeduegf uh jjgghghg',
      button: 'View',
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg'
    },
    {
      index: 2,
      headline: 'For Your Current Mood',
      button: 'View',
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg'
    },
    {
      index: 3,
      headline: 'Focus On The Writing',
      button: 'View',
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
    }
  ]

  const fetchEventList = new Promise((resolve, reject) => {
    getAllEventList().then((data) => {
      if (data && !data.error) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });

  const fetchSpeakerList = new Promise((resolve, reject) => {
    getAllSpeakerList().then((data) => {
      if (data && !data.error) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });

const fetchVenueList = new Promise((resolve, reject) => {
    getAllVenueList().then((data) => {
      if (data && !data.error) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });

  
  
const Slide = (props)=> {
    // constructor(props) {
    //   super(props)
  
    //   handleMouseMove = handleMouseMove.bind(this)
    //   handleMouseLeave = handleMouseLeave.bind(this)
    //   handleSlideClick = handleSlideClick.bind(this)
    //   imageLoaded = imageLoaded.bind(this)
    //   slide = React.createRef()
    // }
    const {slide,index,current} = props

    const handleMouseMove = (event) => {
      const el = slide.current
      const r = el.getBoundingClientRect()
  
      el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)))
      el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)))
    }
    
    const handleMouseLeave = (event) => {    
      slide.current.style.setProperty('--x', 0)
      slide.current.style.setProperty('--y', 0)
    }
    
    const handleSlideClick = (event) => {
      props.handleSlideClick(props.slide.index)
    }
    
    const imageLoaded = (event) => {
      event.target.style.opacity = 1
    }

    //  const image = getEventPoster(slide._id)
      const { src, title } = slide
      const button = "View"
      let classNames = 'slide'
      
      if (current === index) classNames += ' slide--current'
      else if (current - 1 === index) classNames += ' slide--previous'
      else if (current + 1 === index) classNames += ' slide--next'
          
      return (
        <li 
          ref={slide}
          className={classNames} 
          onClick={handleSlideClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="slide__image-wrapper">
            <img 
              className="slide__image"
              alt={title}
              src={`${API}/event/poster/${slide._id}`}
              onLoad={imageLoaded}
            />
          </div>
          
          <article className="slide__content">
            <h2 className="slide__headline">{title?.substring(0,30)}{title?.length > 30 && '...'}</h2>
            <Link to={`/event/${slide._id}`}>
            <button className="slide__action btn">{button}</button>
            </Link>
          </article>
        </li>
      )
    
  }
  
  
  // =========================
  // Slider control
  // =========================
  
  const SliderControl = ({ type, title, handleClick }) => {
    return (
      <button className={`btn btn--${type}`} title={title} onClick={handleClick}>
        <svg className="icon" viewBox="0 0 24 24">
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>
    )
  }
  
  
  // =========================
  // Slider
  // =========================
  
  const Slider =(props)=> {

    const[current,setCurrent] = useState(1)
    const[direction,setDirection] = useState()
    
    const handlePreviousClick=() => {
      const previous = current - 1
          
      setCurrent( (previous < 0) 
          ? props.slides.length - 1
          : previous
      )
    }
    
    const handleNextClick=() => {
      const next = current + 1;
      
      setCurrent((next === props.slides.length) 
          ? 0
          : next
      )
    }
    
    const handleSlideClick = (index) =>{
      if (current !== index) {
        setCurrent(index)
      }
    }
  
      
      const { slides, heading } = props 
      const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
      const wrapperTransform = {
        'transform': `translateX(-${current * (100 / slides.length)}%)`
      }

      const user = useSelector(state => state?.user);
      
      return (
        <div className='slider' aria-labelledby={headingId}>
            <h3 id={headingId} class="visuallyhidden">{heading}</h3>

          <ul className="slider__wrapper" style={wrapperTransform}>
            
            
            {slides.map((slide,index) => {
              return (
                <Slide
                  key={index}
                  index={index}
                  slide={slide}
                  current={current}
                  handleSlideClick={handleSlideClick}
                />
              )
            })}
          </ul>
          
          <div className="slider__controls">
            <SliderControl 
              type="previous"
              title="Go to previous slide"
              handleClick={handlePreviousClick}
            />
            
            <SliderControl 
              type="next"
              title="Go to next slide"
              handleClick={handleNextClick}
            />
          </div>
          <div style={{margin:'auto'}} className="create__event">
      { (user && user.role == 1) &&
      <Button style={{margin:'auto'}} variant="contained" color="secondary" href='/create/event' size="large">
        Create Event
      </Button>
      }
      </div>
        </div>
      
      )
  }
  
export const EventSlider = () =>{

  const dispatch = useDispatch();
  const eventData = useSelector(state => state?.allEvents);
  const preload = async () => {
    //fetching all the data in the landing page itself, so that it can be reused later
    const datas = await Promise.all([fetchEventList,fetchSpeakerList,fetchVenueList]);
    dispatch(storeAllEvents(datas[0]));
    dispatch(storeAllSpeakers(datas[1]));
    dispatch(storeAllVenues(datas[2]));
  };

  React.useEffect(() => {
    preload();
  }, []);

  return(
      <Slider heading="Example Slider" slides={eventData} />
  );
}