import { Button, Snackbar, Rating, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import { Background, DisplayOver, Hover, Paragraph, SubTitle } from '../helper/Background';
import { giveRating } from '../apicalls';
import { useSelector } from 'react-redux';
import theme from '../theme/Theme';

const useStyles = makeStyles({
    root: {
    height:"70vmin",
    width:"100vmin",
    [theme.breakpoints.down("md")]:{
      width:"80vw"
  }
  },
  image: {
    opacity: 0.6,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 'auto',
  },
  
  content: {
    position: 'relative',
  }
  })

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Image() {
    const [value, setValue] = useState(0);
    const [error, setError] = useState(0);

    const user = useSelector(state => state?.user);
    const bestIdea = useSelector(state => state?.bestIdea);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setError(0);
      };

    const handleSubmitRating = (event, newValue) => {
        setValue(newValue);
        giveRating(user._id,bestIdea?._id,newValue)
            .then(response => {
                setError(-1);
            })
            .catch(e => {
                console.log("Error in Submitting Rating");
                setError(1);
            })
    }
    return (
        <div>
            <Background>
                <DisplayOver>
                    <div style={{paddingTop:'3rem', paddingBottom:'3rem',marginLeft:'2rem'}}>
                        <Typography variant='h4' style={{fontWeight:'600'}}>{bestIdea?.subject}</Typography>
                        <Typography variant='body2' style={{marginTop:'1rem',maxHeight:'30em',overflow:'hidden'}}>
                            {bestIdea?.content?.substring(0,580)}{bestIdea?.content?.length>580 && '...'}
                            <br />
                        </Typography>
                            
                            <Typography component="legend" style={{marginTop:'2.5rem'}}>Author Id:</Typography>
                            <Typography variant='body2' style={{fontWeight:'bold'}}>{bestIdea?.author?._id}</Typography>
                            <Typography component="legend">Author Name:</Typography>
                            <Typography variant='body2' style={{fontWeight:'bold'}}>{bestIdea?.author?.name}</Typography>
                            <Typography component="legend" >Avg. Rating:</Typography>
                            <Rating
                                readOnly
                                value={bestIdea?.avgRating}
                                style={{zIndex:1}} 
                                precision={0.5}                               
                            />
                            {/* <Typography component="legend">Date Submitted:</Typography>
                            <Typography variant='body1' style={{fontWeight:'bold'}}>{user?.createdAt?.substr(0,11)}</Typography> */}
                        {/* </div>
                        <div style={{textAlign: 'center'}}> */}
                        
                    </div>
                    {(user && user.role == 1) && 
                <Hover>
                <SubTitle>
                    <Button variant="outlined" color="primary" size="large">
                        View
                    </Button>
                </SubTitle>
                    <Paragraph>
                        <Rating
                            style={{backgroundColor:'rgba(255,255,255,0.2)'}}
                            value={value}
                            onChange={(event, newValue) => {
                                    handleSubmitRating(event, newValue);
                                }}
                            size="large"
                            precision={0.5}
                        />
                    </Paragraph>
                </Hover>}
                </DisplayOver>
            </Background>
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

export const TopIdeas = ()=> {
    const classes = useStyles();

    return (
            <React.Fragment>
                <div className={classes.root} style={{ backgroundSize: '100% 100%',height:"100%"}}>
                    <Image />
                </div>
            </React.Fragment>
        );
};