import React, { useState } from 'react';
import { TextField, 
          Grid, 
          Typography,
          Button, 
          Snackbar, 
          Box, 
          Stepper, 
          Step, 
          StepLabel,
          StepContent, 
          Paper }  from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Header from '../../../utility/Header';
import theme from '../../../theme/Theme';
import { makeStyles } from '@mui/styles';
import { createVenue } from '../../../apicalls';
import { useDispatch } from 'react-redux';
import { setErrorMsg, setLoader, setSuccessMsg } from '../../../action/action';

const useStyles = makeStyles({
    root:{

        backgroundColor:"#222222",
        // height:"98vh",
        width:"80vw",
        margin:"auto",
        padding:"2rem",
        color:"#d3d3d3"
        
      //   [theme.breakpoints.down("md")]:{
      //     paddingLeft:"1rem"
      // }
    },
  left:{
      marginRight: '10vw',
      letterSpacing: '7px'
  },
  inputF:{
      width:'50vw',
      backgroundColor:'#d3d3d3',
      borderRadius:'8px',
      [theme.breakpoints.down("md")]:{
        marginLeft:"2em"
    }
  },
  form:{
      padding:'2rem'
  },
  field:{
      marginBottom:'0.5em'
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


const steps = [
  {
    label: 'Basic Details',
    description: `Give the name of the venue`,
    fields: [
        {name:'name', required:true},
    ]
  },
  {
    label: 'Way to your event.',
    description: `Give the address of the venue`,
    fields: [
        {name:'address', required:true, multiline:true},
    ]
  },
  {
    label: 'More Information',
    description:
      'How many seats are available in the venue?',
    fields: [
        {name:'noOfSeats',required:true}
    ]
  },
];

export default function VenueForm() {

    const [activeStep, setActiveStep] = useState(0);
    const [errorInSubmission, setErrorInSubmission] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const classes = useStyles();

    const [values, setValues] = useState({
        name: '',
        noOfSeats: '',
        address: ''
    });
    

    const handleChange = event =>{
        
        setValues({
            ...values,error: false, [event.target.id]: event.target.value
          }); 
         console.log(values);
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setErrorInSubmission(0);
    };

    const dispatch = useDispatch()

    const Submit  = event => {
      dispatch(setLoader(true))
      event.preventDefault();
      createVenue(values)
        .then(data =>{
          dispatch(setLoader(false))
          if(data.error){
            dispatch(setErrorMsg(data.message?data.message:'Error in Creating Venue'))
          }
          else{
            dispatch(setSuccessMsg('Venue Successfully Created!'))

            setValues({
                ...values,
                name: '',
                noOfSeats: '',
                address: ''
            });
            setErrorInSubmission(-1);
          }})
          .catch(() => {
            console.log("Could not create venue");
            dispatch(setLoader(false))
        dispatch(setErrorMsg('Error in creating Venue'))
          })
    }

    return (
        <>
        <Header />
      <Box className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Grid container className={classes.form}>
                {step.fields?.map((item,index)=>{
                    console.log(item,index)
                    return(
                        <Grid item container style={{marginBottom: "0.5em"}} lg={12}>
                    <TextField 
                    value={values[item.name]}
                  //    fullWidth
                     onChange={handleChange}
                     className={classes.inputF}
                     id={item.name}
                     required ={item.required}
                     multiline={item.multiline}
                     rows={5}
                     label={item.name} />
                     </Grid>
                    )
                })}
                </Grid>
                <Box sx={{ mb: 2 }}>
                    <div>
                    <Button
                        variant="contained"
                        onClick={(e)=>index === steps.length - 1? Submit(e): handleNext(e)}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        {index === steps.length - 1 ? 'Submit' : 'Continue'}
                    </Button>
                    <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Back
                    </Button>
                    </div>
                </Box>
                </StepContent>
            </Step>
            ))}
        </Stepper>
        {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you are finished</Typography>
            <Button onClick={Submit} sx={{ mt: 1, mr: 1 }}>
              Create Venue
            </Button>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
            </Button>
            </Paper>
        )}
        </Box>
        <Snackbar open={errorInSubmission == -1} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Idea Successfuly Venue!
        </Alert>
      </Snackbar>
      <Snackbar open={errorInSubmission == 1} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Unable to Create Venue!
        </Alert>
      </Snackbar>
        </>
    );
        
}
