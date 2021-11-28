/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from '../../utility/Header';
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Chip, Grid, IconButton, Typography, Box, Button, CardMedia } from "@mui/material";
import { API } from "../../backend";
import { getEventById } from "../../apicalls";
import { useSelector } from "react-redux";
import theme from "../../theme/Theme";
import SkipPreviousIcon from '@mui/icons-material/Language';
import PlayArrowIcon from '@mui/icons-material/LinkedIn';
import SkipNextIcon from '@mui/icons-material/GitHub';
import EditIcon from '@mui/icons-material/Edit';
const moment = require('moment');


const useStyles = makeStyles({
  root:{
    backgroundImage: 'url(https://images.pexels.com/photos/7123604/pexels-photo-7123604.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: 'rgba(0,0,0,.5)',
    backgroundBlendMode: 'multiply',
    width: '70vh',
    height: "70vh",
      top: 0,
      fontFamily: 'Helvetica Neue',
      alignItems:'center',
      [theme.breakpoints.down("md")]:{
        height:'90vh'
    }
  },
  body:{
    width:'70vw',
    margin:'auto'
  },
  poster:{
    height:'50vh',
    margin:'auto',
    border:'1px solid white'
  },
  picture:{
    height:'10vmin',
    borderRadius:'50%'
  },
  speaker:{
    padding:'2em',
    border:'1px solid black'
  },
  speakerDetails:{
    padding:'2vmin',
    alignItems:'center'
  },
  left:{
      marginRight: '10vw',
      letterSpacing: '7px'
  },
  inputF:{
      backgroundColor:'#d3d3d3',
      borderRadius:'8px'
  },
  sendButton:{
    marginTop: "5em",
    "&:hover":{
      backgroundColor: "#d3d3d3",
    }
  },
  edit:{
    position: 'relative',
    left: '54vw',
    bottom: '53vh'
  },
})
 
const EventPage = ({match}) => {
  console.log(match)
  const classes = useStyles()
  const imageLoaded = (event) => {
    event.target.style.opacity = 1
    event.target.style.width = '23rem'
    event.target.style.margin = 'auto'
  }
  
  const[event,setEvent] = useState([]);
  const user = useSelector(state => state?.user);
  const fetchEventById = new Promise((resolve, reject) => {
    getEventById(match?.params?.eventId).then((data) => {
      if (data && !data.error) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });

  const preload = async () => {
    const datas = await Promise.all([fetchEventById]);
    console.log(datas,"")
    setEvent(datas[0])
  };
  const time = moment(event?.duration?.startTime);
  console.log(time.format("DD/MM/YY HH:mm"));
  console.log(event)
  
  useEffect(() => {
    preload();
  }, []);
  
  return (
    <div>
      <Header />
      <Grid container className={classes.root}>
        <Grid item lg={2}></Grid>
        <Grid item lg={4} md={6}>
            <img 
              className={classes.poster}
              alt={event?.title}
              src={`${API}/event/poster/${match.params.eventId}`}
              onLoad={imageLoaded}
            />
            {user && user?.role === 1 && (
              <Button href={`/edit/event/${match?.params?.eventId}`} className={classes.edit} variant="contained" color="secondary"><EditIcon/></Button> 
            )}
            
        </Grid>
        <Grid item textAlign='center' lg={4} md={6}>
          <Typography variant='h3' style={{fontWeight:'600',color:'#d3d3d3'}}>{event?.title}</Typography>
          <Typography variant='body1' style={{fontWeight:'600',color:'#d3d3d3'}}>{moment(event?.duration?.startTime).format("DD/MM/YY HH:mm")}</Typography>
          <Typography variant='body1' style={{color:'#d3d3d3'}}>to</Typography>
          <Typography variant='body1' style={{fontWeight:'600',color:'#d3d3d3'}}>{moment(event?.duration?.endTime).format("DD/MM/YY HH:mm")}</Typography>
          <Typography variant='body1' style={{color:'#d3d3d3'}}>at</Typography>
          <Typography variant='body2' style={{fontWeight:'600',color:'#d3d3d3'}}>{event?.venue?.name}</Typography>
          <Typography variant='body2' style={{fontWeight:'600',color:'#d3d3d3'}}>{event?.venue?.address}</Typography>
          <a href={event?.joiningLink} target="_blank" rel="noreferrer"><Typography variant='body1' style={{fontWeight:'600',color:'#d3d3d3'}}>{event?.joiningLink}</Typography></a>
          <Chip label={event?.mode} color="primary"/>

        </Grid>
        
      </Grid>
      <Grid container style={{width:'70vw',marginTop:'2em'}} className={classes.body}>
      <Grid container>
        
        {event?.speaker?.map((item,index)=>
          {
            const speakerImage = `${API}/speaker/picture/${item._id}`
            return(
            <Grid item md={6}>
              <div>
                <Typography variant='body1' style={{fontWeight:'600'}}>Speaker:</Typography>
                <Card sx={{ display: 'flex',margin:'2em'}}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {item.about}
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                      <IconButton aria-label="previous">
                        <SkipNextIcon /> 
                      </IconButton>
                      <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                      </IconButton>
                      <IconButton aria-label="next">
                        <SkipPreviousIcon /> 
                      </IconButton>
                    </Box>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151,maxHeight:151, marginRight: 0,marginLeft:'auto' }}
                    image={speakerImage}
                    alt={item.name}
                  />
                </Card>
              </div>

        </Grid>
          )
          })
      }   

      {event?.eventCoordinator && (
            <Grid item md={6}>
            <Grid item md={12}>
              <Typography variant='body1' style={{fontWeight:'600'}}>Event Coordinator:</Typography>
              <Card sx={{ display: 'flex' ,margin:'2em'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {event?.eventCoordinator.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {event?.eventCoordinator.role?"Teacher":"Student"}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                      <SkipNextIcon /> 
                    </IconButton>
                    <IconButton aria-label="play/pause">
                      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                      <SkipPreviousIcon /> 
                    </IconButton>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151,maxHeight:151, marginRight: 0,marginLeft:'auto' }}
                  image={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                  alt={event?.eventCoordinator.name}
                />
              </Card>
            </Grid>

      </Grid>
          )
      }
        </Grid>
        <Grid container>
        {event?.description && (
          <Grid container style={{padding:'2em',paddingBottom:'1em'}}>
          <Typography variant='body1' style={{fontWeight:'600'}}>About the event:</Typography>
          <Typography variant='body1' style={{padding:'2em'}}>{event?.description}</Typography>
          </Grid>
        )}
        {event?.instruction?.length >0 && (
          <Grid container style={{padding:'2em',paddingTop:'1em'}}>
          <Typography variant='body1' style={{fontWeight:'600'}}>Instructions:</Typography>
          {event?.instruction?.map((item,index)=>(
            <Typography variant='body1' style={{padding:'2em'}}>{index+1}{'. '}{item}</Typography>
          ))}
          </Grid>
          )}
      </Grid>
      </Grid>
    </div>
  );
};

export default EventPage;
