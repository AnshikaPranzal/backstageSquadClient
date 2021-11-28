/* eslint-disable react-hooks/exhaustive-deps */
import { 
    Button, 
    Grid, 
    Typography,
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    Rating, 
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import React, {useState, useEffect, useRef} from "react";
import theme from "../theme/Theme";
import { TopIdeas } from "./TopIdea";
import { getBestIdea, getAllIdea, giveRating } from "../apicalls";
import { useDispatch, useSelector } from 'react-redux';
import { storeBestIdea, storeAllIdea} from "../action/action";
import { Link } from "react-router-dom";


const useStyles = makeStyles({
  root:{
    paddingLeft: '7vw',
    paddingRight: '7vw'
  },
  text:{
    padding: '3vw'
  },
  image:{
    height:'70vh',
    padding: '3vw'
  },
  inputF:{
      backgroundColor:'#d3d3d3',
      borderRadius:'8px',
      [theme.breakpoints.down("md")]:{
        marginLeft:"2em"
    }
  },
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

const IdeaTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '40vw',
    maxHeight: '25vh',
    fontSize: theme.typography.pxToRem(15),
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Ideas() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const ideas = useSelector(state => state?.allIdeas);
  const user = useSelector(state => state?.user);

  const [value, setValue] = useState(0);
  const [error, setError] = useState(0);
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

  const radioGroupRef = useRef(null);

  const openDialogBox = () => setDialogBoxOpen(true);
  const closeDialogBox = () => setDialogBoxOpen(false);
  
  const handleSubmitRating = (event, newValue, id) => {
    setValue(newValue);
    giveRating(user._id,id,newValue)
        .then(response => {
            setError(-1);
        })
        .catch(e => {
            console.log("Error in Submitting Rating");
            setError(1);
        });
  }

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const fetchIdeaList = new Promise((resolve, reject) => {
    getAllIdea().then((data) => {
      if (data && !data.error) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });
  
  const fetchBestIdea = new Promise((resolve, reject) => {
    getBestIdea().then((data) => {
      if (data && !data.error) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(0);
  };

  const preload = async () => {
    const datas = await Promise.all([fetchIdeaList,fetchBestIdea]);
    dispatch(storeAllIdea(datas[0]));
    dispatch(storeBestIdea(datas[1][0]));
  };
  

  useEffect(() => {
    preload()
  }, [])

  return (
    <div style={{height:'88vh'}}>
      <Grid container className={classes.root} justify="center" alignItems="center">
          <Grid item className={classes.text} lg={3}>
              <Typography variant='h1'>View <span style={{fontWeight:'600'}}>Ideas</span></Typography>
              <Typography variant='body1'>
              So basically, students can explore their minds and send an event idea to the teachers and teachers review and act upon the intereseting and feasible ideas. Here is the best rated idea with us.
              </Typography>
              <Grid className={classes.viewButton}>
                {(user && user.role === 1)?
              <Button variant="contained" color="secondary" size="large" onClick={openDialogBox}>
                View All
              </Button>
              :
              <Link to="/create/idea">
              <Button variant="contained" color="secondary" size="large" onClick={openDialogBox}>
                Create Yours
              </Button>
              </Link>
              } 
              </Grid>
          </Grid>
          <Grid item lg={1}>
            
          </Grid>
          <Grid item lg={8} className={classes.image}>
            <TopIdeas/>
          </Grid>
      </Grid>
      <Grid container className={classes.itemList}>
      <Dialog
          sx={{ 
            '& .MuiDialog-paper': { 
              maxWidth: '70vw', 
              maxHeight: '60vh',
              bgcolor: '#c3bebb' 
            },
          }}
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
                {ideas?.map((el,i) => {
                  const isIdeaRated = el?.ratings?.findIndex(rating => rating?.user === user?._id) !== -1;
                  return(
                      <>
                      <ListItem>
                          <ListItemAvatar>
                              <Avatar sx={{bgcolor:'black'}}>
                                  {el?.subject?.substr(0,1)}
                              </Avatar>
                          </ListItemAvatar>
                          <ListItemText 
                              primary={
                                <>
                                  {el?.subject}&nbsp;&nbsp;&nbsp;&nbsp;{el?.avgRating} 
                                  <Rating 
                                    style={{position: 'relative', top: '0.35vh'}}
                                    readOnly 
                                    defaultValue={1} 
                                    max={1}
                                    size="small" />
                                </>
                              } 
                              secondary={
                                <>
                                  <div style={{display:'flex'}}>
                                    <Rating
                                      style={{backgroundColor:'rgba(255,255,255,0.2)'}}
                                      value={isIdeaRated ? el?.avgRating : value}
                                      size="large"
                                      onChange={(event, newValue) => {
                                            handleSubmitRating(event, newValue, el?._id);
                                        }}
                                      precision={0.5}
                                      readOnly={isIdeaRated || value !== 0}
                                    />
                                    <div className={classes.ideaActions}>
                                      <a href={`callto:${el?.author?.contactNumber}`}>
                                        <IdeaTooltip title="Call author" aria-label="add" arrow>
                                          <CallIcon sx={{color:'black'}}/>
                                        </IdeaTooltip>
                                      </a>
                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                      <a href={`mailto:${el?.author?.email}`}>
                                        <IdeaTooltip title="Send email" aria-label="add" arrow>
                                          <EmailIcon sx={{color:'black'}}/>
                                        </IdeaTooltip>
                                      </a>
                                      
                                    </div> 
                                  </div>
                                  {el?.content?.length > 120 ? (
                                    <IdeaTooltip title={el?.content} aria-label="add" arrow>
                                      <Typography>
                                        {`${el?.content?.substring(0, 120)}...`}
                                      </Typography>
                                    </IdeaTooltip>
                                  ) : (
                                    <Typography>{el?.content}</Typography>
                                  )}
                                  <Typography>Author : {el?.author?.name} ({el?.author?._id} )</Typography>
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
        <Snackbar open={error === -1} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Rating submitted Successfully!
              </Alert>
            </Snackbar>
            <Snackbar open={error === 1} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Error in Rating!
              </Alert>
            </Snackbar>
    </div>
  );
}

export default Ideas;
