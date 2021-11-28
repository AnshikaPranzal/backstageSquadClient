/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Grid,  Card, Typography, Button, useMediaQuery, Hidden, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles'
import { useTheme } from '@emotion/react';
import theme1 from '../theme/Theme';
import { signin, signup } from '../apicalls/auth';
import { storeUser,storeUserEngagements } from "../action/action";
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme=>({
    root:{
        backgroundColor:"#d3d3d3",
        height:"98vh",
        top: 0,
        fontFamily: 'Helvetica Neue'
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
  }
}))

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = (props)=> {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user,setUser] = useState({
        email:"",
        password:"",
        error:"",
        success: false
    })
    const {email, password , error, success} = user;
    const theme = useTheme();

    const [emailHelper, setemailHelper] = useState('');
    const [errorOnSubmit, setErrorOnSubmit] = useState(0);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setErrorOnSubmit(0);
    };

    const onSubmit = event => {
        event.preventDefault();
        setUser({
            ...user,error: false
        })
        signin({email,password})
            .then( (data) =>{
              console.log(data)
                if(data.erroris){
                    setUser({
                        ...user,
                        error: data.error,
                        success: false
                    });
                    setErrorOnSubmit(1);
                }
                else{
                    setUser({
                        ...user,
                        email:"",
                        password:"",
                        error:"",
                        success: true
                    });
                    dispatch(storeUser(data?.user));
                    setErrorOnSubmit(-1);
                    props.history.push('/');
                }
            })
            .catch(() => {
              console.log("Error in signin");
              setErrorOnSubmit(1);
            })
    }
    const handleChange = event=>{
      let valid;
      setUser({
        ...user,error: false, [event.target.id]: event.target.value
      })
      switch(event.target.id){
        case 'email':
          valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)

          if(!valid){
            setemailHelper("Please enter a valid email.")
          }
          else{
            setemailHelper("")
          }
          break;
        
        default:
            break;
      }
      
    }


    const errorMessage = () =>{
       
    return(
        <div className="row ">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
        </div>
        </div>
        </div>
    )}

   return(

    <Grid container direction="row" className={classes.root}>
        <Hidden lgDown>
    <Grid item container className={classes.left} style={{transform: 'rotate(270deg)',marginBottom:'auto',marginTop: 'auto'}}  lg={3} xl={3} sm={3}>
        <Typography variant="body1" style={{fontSize: "4em",margin:'auto', textAlign:'center',letterSpacing:'20px'}} align="center">WELCOME</Typography>
      </Grid>
      </Hidden>
      <Grid item container direction="column" justify="center" alignItems="center" style={{height:'100%',backgroundColor:"#2C2C2B",margin:'auto'}} lg={9} xl={9} sm={9} >
        <Grid container="columns" justify="center" alignItems="center" style={{margin:'auto'}} lg={5} xl={5} sm={12}>
          <Grid item style={{width:'100em',marginBottom:'3rem'}} textAlign="center">
            <Typography variant="h2" style={{fontSize: "4rem", fontWeight:'600',letterSpacing:'6px'}}>LOGIN</Typography>
          </Grid>
        {errorMessage()}
        
        <Grid item direction="row" container justify="center" alignItems="center">
          
          <Grid item style={{marginBottom: "0.5em"}} lg={12} xl={12} sm={12}>
            <TextField 
            value={email}
            fullWidth
            error = {emailHelper.length !== 0}
            className={classes.inputF}
            helperText = {emailHelper}
            style={{margin:'auto'}}
            onChange={handleChange} 
            id="email" 
            required 
            label="Email" />
          </Grid>

          <Grid item style={{marginBottom: "0.5em"}}  lg={12} xl={12} sm={12}>
            <TextField 
            value={password}
            type="password"
            fullWidth
            className={classes.inputF}
            onChange={handleChange} 
            id="password" 
            required 
            label="Password" 
            />
          </Grid>

          <Grid item container justify="center">
          <Button 
          variant="contained"
          fullWidth
          disabled = {email.length === 0 || password.length < 5 || emailHelper.length !== 0 }
          className={classes.sendButton}
          onClick={onSubmit}
          >
              
            Submit
            {/* <img src={airplane} alt="send" style={{marginLeft:"1em"}}/> */}
          </Button>
          </Grid>
          <Grid item container textAlign="center" style={{width:'100%'}} justify="center">
            <Link to="/register">New User? Register here.</Link>
          </Grid>
        </Grid>
            
          </Grid>
        </Grid>
        <Snackbar open={errorOnSubmit === -1} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Login Successful!
        </Alert>
      </Snackbar>
      <Snackbar open={errorOnSubmit === 1} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Error in Login! Please give correct credentials.
        </Alert>
      </Snackbar>
    </Grid>
     
   );
  }
  
  
  export default withRouter(Login);