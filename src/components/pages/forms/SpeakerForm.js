import React, { useState } from 'react';
import { TextField, 
          Grid, 
          Typography,
          Button, 
          Box, 
          Stepper, 
          Step, 
          StepLabel,
          StepContent }  from '@mui/material';
import Header from '../../../utility/Header';
import styled from '@emotion/styled/macro';
import theme from '../../../theme/Theme';
import { makeStyles } from '@mui/styles';
import { createSpeaker } from '../../../apicalls';
import { useDispatch } from 'react-redux';
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
  submitButton:{
    marginTop: "5em",
    backgroundColor: "#222222",
    "&:hover":{
      backgroundColor: "#d3d3d3",
    }
  },
  imageName:{
      padding:'0.4em',
      border:"#d3d3d3 solid 2px",
      borderRadius:'4px',
      marginLeft:'0.5em'
  }
})

const Input = styled('input')({
    display: 'none',
  });

const steps = [
  {
    label: 'Basic Details',
    description: `Give the name and email of the speaker`,
    fields: [
        {name:'name', required:true},
        {name:'email'}
    ]
  },
  {
    label: 'More Information',
    description:
      'Tell something about the speaker',
    fields: [
        {name:'about', multiline:true}
    ],
    files: [
      {name:'picture'}
  ],
  },
  {
    label: `Let's talk social media.`,
    description: `Give us social media address of the speaker.`,
    fields: [
        {name:'linkedinUrl' },
        {name:'githubUrl' }, 
    ]
  },
];

export default function SpeakerForm() {

    const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const classes = useStyles();

    const [values, setValues] = useState({
        name: '',
        email: '',
        picture: '',
        about: '',
        linkedinUrl:'',
        githubUrl: '',
        formData: new FormData(),
    });
    
    const {formData} = values;

    const handleChange = event =>{
      if(!event.target.id)
      event.target.id=event.target.name
      let v;
      if(event.target.id === "picture"){
        v = event.target.files[0];
      } else if(event.target.id === "name" && event.target.value.length > 40) {
        v = [event.target.id];
      } else {
        v = event.target.value;
      }
      formData.set(event.target.id,v);
        setValues({
            ...values, error: false, [event.target.id]: event.target.value
          }); 
      console.log(values);
    }

    const requiredFieldCheck = new Promise((resolve, reject) => {
      steps[activeStep]?.fields?.forEach((item)=>{
          if(!values[item.name] && (item.required)){
              reject("required fields not filled")
          }
          
      })
      steps[activeStep]?.files?.forEach((item)=>{
          if(!values[item.name] && item.required){
              reject("required fields not filled")
          }
      })
      resolve("done")
    });

    const handleNext = () => {
      Promise.resolve(requiredFieldCheck)
      .then(()=>{
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
      .catch(err=>{
        dispatch(setErrorMsg("Please fill the required fields"))
          console.log(err)
      })
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const Submit  = event => {
    dispatch(setLoader(true))
    event.preventDefault();
      createSpeaker(formData)
        .then(data =>{
        dispatch(setLoader(false))
          if(data.error){
            dispatch(setErrorMsg(data.message?data.message:'Error in Creating Speaker'))
          }
          else{
            dispatch(setSuccessMsg('Speaker Successfully Created!'))
            setValues({
                ...values,
                name: '',
                email: '',
                picture: '',
                about: '',
                linkedinUrl:'',
                githubUrl: '',
                formData: new FormData(),

            });
          }})
          .catch(() => {
            console.log("Could not create speaker");
            dispatch(setLoader(false))
            dispatch(setErrorMsg('Error in creating Speaker'))
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
                {step.files?.map((item)=>{
                  
                  return(
                    <Grid item container style={{marginBottom: "2em",width:'50vw'}} lg={12}>
                        <label htmlFor={item.name}>
                            <Input accept="image/*" multiple type="file" value={values[item.name]} onChange={handleChange} id={item.name} />
                            <Button variant="contained" component="span">
                                Upload {item.name}
                            </Button>
                        </label>
                        <span className={classes.imageName}>
                          {values[item.name] ? (
                            <span>{values[item.name].substring(12)}&nbsp; 
                              <span style={{fontWeight:'600',cursor:'pointer'}} onClick={()=>{setValues({...values, poster:''}) }}>X</span>
                            </span> 
                          ) : "No File Selected"}</span>
                    </Grid>
                  )
              })}
                </Grid>
                <Box sx={{ mb: 2 }}>
                    <div>
                    <Button
                        variant="contained"
                        sx={{ mt: 1, mr: 1 }}
                        onClick={(e)=>index === steps.length - 1? Submit(e): handleNext(e)}
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
