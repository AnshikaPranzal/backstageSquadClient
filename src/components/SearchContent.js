import React,{useState,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Button, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    Divider,
    Typography, 
    CircularProgress,
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Link,
} from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import {switchSearchedId} from '../action/action';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import { makeStyles } from '@mui/styles';
import { API } from '../backend';

const useStyles = makeStyles({
    box:{
        width: '70vw',
        height: '80vh',
        marginLeft: '15vw',
        backgroundColor:'#c3bebb',
        overflow:'auto',
    },
    speakerImage: {
        height: '27vh',
        width: '10vw',
        backgroundColor:'#bab0aa',
    },
    speakerPic:{
        height:'100%',
        width:'100%',
        objectFit: 'cover'
    },
    speakerDetails:{
        textAlign:'right',
        position:'absolute',
        right:'2vw',
        width:'22vw',
        top: '50%',
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)'
    },
    dialogCont:{
        display:'flex', 
        overflow:'auto',
        paddingBottom:'2vh'
    },
    iconLinks:{
        position: 'relative', 
        top: '0.5vh'
    }
})

const SearchItem = props => {

    const classes = useStyles();
    const {open, handleDialogBox, searchedItem } = props;
    const radioGroupRef = useRef(null);
    console.log("hi abc",searchedItem)
    const vaccine = ["Not Vaccinated", "Partly Vaccinated", "Completely Vaccinated"]

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
          radioGroupRef.current.focus();
        }
    };

    const Edit = () => {
        handleDialogBox(searchedItem?._id); 
    }

    const Delete = () => {
        handleDialogBox(); 
    }
    return(
        <Dialog
          sx={{ 
            '& .MuiDialog-paper': { 
              maxWidth: '70vw', 
              maxHeight: '70vh',
              height:'50vh',
              bgcolor: '#c3bebb' 
            },
          }}
          TransitionProps={{ onEntering: handleEntering }}
          open={open}
        >
            <DialogTitle>
            <Typography variant="h5">{searchedItem?.name}</Typography> 
          </DialogTitle>
          <DialogContent dividers>
            <div className={classes.dialogCont}>
                <div className={classes.speakerImage}>
                    <img 
                        className={classes.speakerPic}
                        src={`${API}/speaker/picture/${searchedItem?._id}`} 
                        alt="No Img" 
                    />
                </div>
                <div className={classes.speakerDetails}>
                   <Typography>
                      {searchedItem?.about} <br/>
                      {searchedItem?.linkedinUrl && (
                          <Typography>
                            LinkedIn Account : &nbsp;
                            <Link href={searchedItem?.linkedinUrl} target="_blank" underline="hover" color="#242423">
                                <LinkedInIcon className={classes.iconLinks}/>
                            </Link><br/>
                          </Typography>
                      )}
                      {searchedItem?.githubUrl && (
                        <Typography>
                            GitHub Account : &nbsp;
                            <Link href={searchedItem?.githubUrl} target="_blank" underline="hover" color="#242423">
                                <GitHubIcon className={classes.iconLinks}/>
                            </Link><br/>
                        </Typography>)}
                      {searchedItem?.portfolioUrl && (
                        <Typography>
                            Portfolio Account : &nbsp;
                            <Link href={searchedItem?.portfolioUrl} target="_blank" underline="hover" color="#242423">
                                <LanguageIcon className={classes.iconLinks}/>
                            </Link><br/>
                        </Typography>)}
                      Vaccination Status : &nbsp; {vaccine[searchedItem?.vaccineStatus]}<br/>
                  </Typography>                  
                </div>      
            </div>
          </DialogContent>
          <DialogActions>
          <div style={{    
                position: 'relative',
                marginRight: '20vw'}}>
            <Button autoFocus onClick={handleDialogBox} variant="outlined" color="secondary">
                Close
            </Button>
          </div>
        
        <Button onClick={Edit} color="secondary" variant="contained">Edit</Button>
        <Button onClick={Delete} color="secondary" variant="contained">Delete</Button>
      </DialogActions>
    </Dialog>
    )
}
const SearchContent = () => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const searchedResult = useSelector(state => state.searchedResult);
    const searchId = useSelector(state => state.searchedId);
    const searchLoading = useSelector(state => state.searchLoading);

    const searchBasis = ['User', 'Speaker', 'Event'];

    const [openSearchItem, setOpenSearchItem] = useState(false);
    const [ searchItem, setSearchItem] = useState({});

    const handleSearchId = data => {
        if(data !== searchId) dispatch(switchSearchedId(data));
    }

    const selectEvent = (item,index) => {
        if(searchId == 1){
            setSearchItem(item);
            setOpenSearchItem(true);
        }      
    }
    
    if(searchLoading){
        console.log('loading');
        return(
        <div className='search-loading'>
            <CircularProgress color='inherit'/>
        </div>
        );
    } else if(!searchedResult || searchedResult?.length === 0) {
        return (
            <Box className={classes.box}>
            <List
                sx={{
                    width: '100%',
                    maxWidth: '65vw',
                    left:'2vw'
                }}
            >
                <ListItem style={{
                paddingLeft: '5vw'
                }}>
                {searchBasis.map((el,i) => {
                    return(
                    <Button 
                    variant={i === searchId ? 'contained' : 'outlined'} 
                    color="secondary"
                    onClick={() => handleSearchId(i)}
                    style={{marginRight: '1vw'}}>{el}</Button> 
                    )
                })}
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
            <div className='no-results'> 
                <div style={{paddingLeft:'3vw'}}>
                <ErrorOutlineOutlinedIcon fontSize='large'/>
                </div>
                <br/> 
                <Typography>No Results Found </Typography>
            </div>
            </Box>
        );
        }else {
        return(
            <Box className={classes.box}>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: '65vw',
                        left:'2vw',
                        overflow:'visible'
                    }}
                >
                    <ListItem style={{
                    paddingLeft: '5vw'
                    }}>
                    {searchBasis.map((el,i) => {
                        return(
                        <Button 
                        variant={i === searchId ? 'contained' : 'outlined'}
                        color="secondary" 
                        onClick={() => handleSearchId(i)}
                        style={{marginRight: '1vw'}}>{el}</Button> 
                        )
                    })}
                    </ListItem>
                    {searchedResult?.map((el,i) => {
                        return(
                            <>
                            <ListItem 
                                button={searchId === 1 || searchId === 2}
                                onClick={() => selectEvent(el,i)}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor:'black'}}>
                                        {el?.name?.substr(0,1)}
                                    </Avatar>
                                </ListItemAvatar>
                                {searchId === 0 && <ListItemText primary={el?.name} secondary={el?.email} />}
                                {searchId === 1 && <ListItemText primary={el?.name} secondary={el?.about} />}
                                {searchId === 2 && <ListItemText primary={el?.title} secondary={el?.mode} />}
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            </>
                        )
                    })}
                    <SearchItem 
                        open={openSearchItem} 
                        handleDialogBox={() => setOpenSearchItem(false)} 
                        searchedItem={searchItem}
                    />
                </List>
            </Box>
        );
        }
}
export default SearchContent;