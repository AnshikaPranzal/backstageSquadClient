import React, { useState } from 'react';
import { TextField, 
          Grid,  
          Typography,
          Button,  
          Box, 
          Stepper, 
          Step, 
          StepLabel,
          StepContent
        }  from '@mui/material';
import Header from '../../../utility/Header';
import theme from '../../../theme/Theme';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createIdea } from '../../../apicalls';
import { setErrorMsg, setLoader, setSuccessMsg } from '../../../action/action';


const useStyles = makeStyles({
    root:{

        backgroundColor:"#222222",
        width:"80vw",
        margin:"auto",
        padding:"2rem",
        color:"#d3d3d3"
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

const steps = [
  {
    label: 'Basic Details',
    description: `Give a suitable subject to your idea`,
    fields: [
        {name:'subject', required:true},
    ]
  },
  {
    label: 'More Information',
    description:
      'Elaborate the idea. You can also state the inspiration of this idea',
    fields: [
        {name:'content',required:true,multiline:true}
    ]
  }
];

export default function IdeaForm() {

    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);
    const userId = useSelector(state => state?.user?._id);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [values, setValues] = useState({
        subject: '',
        content: ''
    });
    

    const handleChange = event =>{
        
        setValues({
            ...values,error: false, [event.target.id]: event.target.value
          }); 
        console.log(values);
    }

    const dispatch = useDispatch()

    const Submit  = event => {
    dispatch(setLoader(true))
    event.preventDefault();
      createIdea(values,userId)
        .then(data =>{
      dispatch(setLoader(false))

          if(data.error){
            dispatch(setErrorMsg(data.message?data.message:'Error in Creating Idea'))
          }
          else{
            dispatch(setSuccessMsg('Idea Successfully Created!'))
            setValues({
              ...values,
              subject: '',
              content: '',
            });
          }})
          .catch(() => {
            console.log("Could not create idea");
            dispatch(setLoader(false))
            dispatch(setErrorMsg('Error in creating Idea'))
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
        </Box>
        </>
    );
}
