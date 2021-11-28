import React,{useState, useRef, useEffect} from 'react';

import { 
  Button, 
  Grid, 
  Box,
  ButtonBase,
  Typography,
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Chip,
  Avatar, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import theme from "../theme/Theme";
import {withRouter } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { storeUserEngagements } from './../action/action';
import { getUserById } from '../apicalls';

const teacherList = [
  {
    url: 'https://images.pexels.com/photos/2547434/pexels-photo-2547434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Add Venue',
    width: '33%',
    path: '/create/venue'
  },
  {
    url: 'https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Add Speaker',
    width: '33%',
    path: '/create/speaker'
  },
  {
    url: 'https://images.pexels.com/photos/3184658/pexels-photo-3184658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Upgrade to Teacher',
    width: '33%',
    path: '/upgrade/teacher'
  },
];

const studentList = [
  {
    url: 'https://images.pexels.com/photos/2547434/pexels-photo-2547434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Events you\'re Coordinating',
    width: '50%',
    click: 0
  },
  {
    url: 'https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Ideas you\'ve submitted',
    width: '50%',
    click: 1
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,


  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const useStyles = makeStyles({
  
  viewButton:{
    marginTop: "2em"
  },
  itemList:{
    marginTop:'9vh'
  },
  ideaActions: {
    position: 'relative',
      left: '45vw'
  }
})

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const IdeaTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: '#f5f5f9',
    // color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '40vw',
    maxHeight: '25vh',
    fontSize: theme.typography.pxToRem(15),
  },
}));

const AddButtons = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [dialogBoxOpen, setDialogBxOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState([]);
  const [list, setList] = useState(-1);

  const radioGroupRef = useRef(null);

  const user = useSelector(state => state?.user);
  const userEngagements = useSelector(state => state?.userEngagements);
  console.log(userEngagements)
  const linkList = (user && user?.role == 1) ? teacherList:studentList;

  const fetchUserById = (id) => {
    getUserById(id).then((data) => {
      console.log(data)
      if (data && !data.error) {
        dispatch(storeUserEngagements(data));
      } else {
        console.log("Error in fetching User  Engagements.");
      }
    });  
  }
  // console.log((user && user.role == 1),user,user.role,"tralaa")
  const handleClick = (index) => {
    setDialogBxOpen(true);
    setList(index);
    setDialogContent(index === 0 ? userEngagements?.coordinatingEvents : userEngagements?.yourIdeas);
  }

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const openEventPage = id => {
    if(list === 0){
      props.history.push(`/event/${id}`)
    }    
  }

  const closeDialogBox = () => setDialogBxOpen(false);

  useEffect(() => fetchUserById(user?._id),[user?._id]);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {linkList.map((image,i) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => handleClick(image.click)}
          // href={image.path}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
      <Grid container className={classes.itemList}>
      <Dialog
          sx={{ 
            '& .MuiDialog-paper': { 
              maxWidth: '70vw', 
              width:'40vw',
              maxHeight: '60vh',
              height:'60vh',
              bgcolor: '#c3bebb' 
            },
          }}
          // maxWidth="xs"
          TransitionProps={{ onEntering: handleEntering }}
          open={dialogBoxOpen}
        >
          <DialogTitle>
            <Typography variant="h5">IDEAS</Typography> 
          </DialogTitle>
          <DialogContent dividers>
          <List  
              sx={{
                  width: '100%',
                  maxWidth: '70vw',
              }}
            >
                {dialogContent?.map((el,i) => {
                  const name = list === 0 ? el?.title : el?.subject;
                  const content = el?.content;
                  return(
                      <>
                      <ListItem 
                        button={list === 0}
                        onClick={() => openEventPage(el?._id)}>
                          <ListItemAvatar>
                              <Avatar sx={{bgcolor:'black'}}>
                                  {name?.substr(0,1)}
                              </Avatar>
                          </ListItemAvatar>
                          <ListItemText 
                              primary={name} 
                              secondary={
                                  <>
                                  {list === 0 && (<Chip label={el?.mode} color="primary"/>)}
                                  { list === 1 && content?.length > 120 ? (
                                    <IdeaTooltip title={content} aria-label="add" arrow>
                                      <Typography>
                                        {`${content?.substring(0, 120)}...`}
                                      </Typography>
                                    </IdeaTooltip>
                                  ) : (
                                    <Typography>{content}</Typography>
                                  )}
                                  </>
                                }
                            />
                          
                      </ListItem>
                      </>
                )})}
            </List>
            </DialogContent>
            <DialogActions>
            <Button autoFocus variant="contained" color="secondary" onClick={closeDialogBox}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        </Grid>
    </Box>
  );
}
 export default withRouter(AddButtons);