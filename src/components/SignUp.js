/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TextField, Grid,  Card, Typography, Button, useMediaQuery, Hidden, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
// import { makeStyles } from '@mui/styles'
import { useTheme } from '@emotion/react';
import theme from '../theme/Theme';
import { signup } from '../apicalls/auth';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    root:{

        backgroundColor:"#d3d3d3",
        height:"98vh",
        top: 0,
        fontFamily: 'Helvetica Neue',
        
      //   [theme.breakpoints.down("md")]:{
      //     paddingLeft:"1rem"
      // }
    },
  left:{
      marginRight: '10vw',
      letterSpacing: '7px'
  },
  inputF:{
      backgroundColor:'#d3d3d3',
      borderRadius:'8px',
      [theme.breakpoints.down("md")]:{
        marginLeft:"2em"
    }
  },
  sendButton:{
    marginTop: "5em",
    "&:hover":{
      backgroundColor: "#d3d3d3",
    }
  }
})

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = (props)=> {
    const classes = useStyles();
    const [user,setUser] = useState({
        name:"",
        email:"",
        collegeId: "",
        contactNumber:"",
        password:"",
        confirmPassword:"",
        error:"",
        success: false
    })
    const {name, email, collegeId, contactNumber, password,confirmPassword, error, success} = user;
    const theme = useTheme();

    const [collegeIdHelper,setCollegeIdHelper] = useState('');
    const [emailHelper, setemailHelper] = useState('');
    const [passwordHelper, setPasswordHelper] = useState('');
    const [contactHelper, setContactHelper] = useState('');
    const [errorOnSubmit, setErrorOnSubmit] = useState(false);
    const [successOnSubmit, setSuccessOnSubmit] = useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setErrorOnSubmit(false);
      setSuccessOnSubmit(false);
    };

    const onSubmit = event => {
        event.preventDefault();
        setUser({
            ...user,error: false
        })
        signup({name,email,collegeId,password,contactNumber})
            .then( (data) =>{
                console.log(data)
                if(data.error){
                    setUser({
                        ...user,
                        error: data.erroris,
                        success: false
                    });
                    setErrorOnSubmit(true);
                }
                else{
                    setUser({
                        ...user,
                        name:"",
                        email:"",
                        collegeId:"",
                        password:"",
                        contactNumber:"",
                        confirmPassword:"",
                        error:"",
                        success: true
                    });
                    setSuccessOnSubmit(true);
                    props.history.push('/login');
                }
            })
            .catch(() => {
              console.log("Error in signup");
              setErrorOnSubmit(true);
            })
    }
    const handleChange = event=>{
      let valid;
      
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
        case 'password':
            if(password.length < 5){
                setPasswordHelper("Password length should be greater than 5.")
            }
            else{
                setPasswordHelper("")
            }
            break;
        case 'contactNumber':
            if(event.target.value.length !== 10){
              setContactHelper("Please enter a valid contact Number")
            }
            else{
                setContactHelper('')
            }
            break;
        case 'collegeId':
          if(event.target.value.length !== 7){
            setCollegeIdHelper("College Id should be 7 digits.")
          }
          else{
            setCollegeIdHelper("")
          }
          break;
        default:
            break;
      }
      setUser({
        ...user,error: false, [event.target.id]: event.target.value
      })
      
    }

    const successMessage = () =>(
        <div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        Congratulations!!!You are registered with us. Start now{" "}<Link to="/login">here</Link>
                    </div>
                </div>
        </div>
    )

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
            <Typography variant="h2" style={{fontSize: "4rem", fontWeight:'600',letterSpacing:'6px'}}>REGISTER</Typography>
          </Grid>
        
        <Grid item container style={{margin: "auto"}} justify="center" alignItems="center">
          <Grid item container style={{marginBottom: "0.5em"}} lg={12} xl={12} sm={12}>
            <TextField 
            value={name}
             fullWidth
             onChange={handleChange}
             id="name"
             className={classes.inputF}
             required 
             label="Name" />
          </Grid>
          
          <Grid item container style={{marginBottom: "0.5em"}} lg={12} xl={12} sm={12}>
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

          <Grid item container style={{marginBottom: "0.5em"}} lg={12} xl={12} sm={12}>
            <TextField 
            value={collegeId}
            fullWidth
            error = {collegeIdHelper.length !== 0}
            className={classes.inputF}
            helperText = {collegeIdHelper}
            style={{margin:'auto'}}
            onChange={handleChange} 
            id="collegeId" 
            required 
            label="College Id" />
          </Grid>

          <Grid item container style={{marginBottom: "0.5em"}}  lg={12} xl={12} sm={12}>
            <TextField 
            value={contactNumber}
            fullWidth
            error = {contactHelper.length !== 0}
            className={classes.inputF}
            helperText = {contactHelper}
            onChange={handleChange} 
            id="contactNumber" 
            required 
            label="Contact Number" />
          </Grid>

          <Grid item container style={{marginBottom: "0.5em"}}  lg={12} xl={12} sm={12}>
            <TextField 
            value={password}
            type="password"
            fullWidth
            error = {passwordHelper.length !== 0}
            className={classes.inputF}
            helperText = {passwordHelper}
            onChange={handleChange} 
            id="password" 
            required 
            label="Password" 
            />
          </Grid>

          <Grid item container style={{marginBottom: "0.5em"}}  lg={12} xl={12} sm={12}>
            <TextField 
            value={confirmPassword}
            type="password"
            fullWidth
            error = {emailHelper.length !== 0}
            className={classes.inputF}
            helperText = {emailHelper}
            onChange={handleChange} 
            id="confirmPassword" 
            required 
            label="Confirm Password" 
            />
          </Grid>
          
          <Grid item container justify="center">
          <Button 
          variant="contained"
          fullWidth
          disabled = {name.length === 0 || contactNumber.length !== 10 || collegeId.length === 0 || email.length === 0 || emailHelper.length !== 0 || collegeIdHelper.length !== 0 || contactHelper.length !== 0 || passwordHelper.length !== 0 || password.length <= 5 || password !== confirmPassword}
          className={classes.sendButton}
          onClick={onSubmit}
          >
              
            Submit
            {/* <img src={airplane} alt="send" style={{marginLeft:"1em"}}/> */}
          </Button>
          </Grid>
        </Grid>
          </Grid>
        </Grid>
        <Snackbar open={successOnSubmit} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Sign Up Successful!
        </Alert>
      </Snackbar>
      <Snackbar open={errorOnSubmit} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Error in Sign Up!
        </Alert>
      </Snackbar>
    </Grid>
     
   );
  }
  
  
  export default SignUp;