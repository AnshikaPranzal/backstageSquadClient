import React,{useEffect} from 'react';
import { 
    TextField, 
    Grid, 
    Typography, 
    Button, 
    FormControl, 
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    FormLabel, 
    FormControlLabel, 
    Radio, 
    RadioGroup,
    ListItem,
    Chip,
    Autocomplete} from '@mui/material';
import { Link,withRouter } from 'react-router-dom';
import theme from '../../../theme/Theme';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Header from '../../../utility/Header';
import styled from '@emotion/styled/macro';
import { editEvent, getAllSpeakerList, getAllVenueList, search } from '../../../apicalls';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
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
  selectF:{
    width:'50vw',
    height:'3rem',
    backgroundColor:'#d3d3d3',
    borderRadius:'8px',
    [theme.breakpoints.down("md")]:{
      marginLeft:"2em"
    }
  },
  dateF:{
    width:'25vw',
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
      marginBottom:'1em'
  },
  sendButton:{
    marginTop: "5em",
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

const DurationTooltip = styled(({ className, ...props }) => (
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

const Input = styled('input')({
    display: 'none',
  });

const steps = [
  {
    label: 'Basic Details',
    description: `Let's start with editing the basics..`,
    fields: [
        {name:'title'},
        {name:'description',multiline:true},
        {name:'instruction'},
    ]
  },
  {
    label: 'Where\'s it happening?',
    description:
      'You can edit the existing venue!!',
    fields: [
        {name:'joiningLink', avoid:"Offline"}
    ],
    radioFields:[
        {name:'mode',values:["Hybrid","Virtual","Offline"]}
    ],
    selectFields:[
        {name:'venue',avoid:"Virtual"},
    ]
  },
  {
    label: 'More Information',
    description:
      'You can add or delete speakers. If you can\'t find the speaker here in the list, feel free to add one.',
    fields: [
    ],
    files: [
        {name:'poster'}
    ],
    selectFields:[
        {name:'speaker'},
        {name:'eventCoordinator'},
    ],
    timeFields:[
        {name:"startTime"},
        {name:"endTime"},
    ]
  },
  
  {
    label: 'Payment',
    description:
      'Payment Stuff!',
    fields: [
        {name:'amountPayable',avoid:"Free"}
    ],
    radioFields:[
        {name:'paid',values:["Free","Paid"]}
    ]
  },
];


const EventEditForm = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const eventId = props?.match?.params?.eventId; 

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const classes = useStyles();


  const speakerList = useSelector(state => state.allSpeakers)
  const venueList = useSelector(state => state.allVenues)
  const [errorInSubmission, setErrorInSubmission] = useState(0);
  

  const [values, setValues] = useState({
    title: '',
    description: '',
    instruction: '',
    speaker: '',
    venue: '',
    startTime: null,
    endTime: null,
    poster: '',
    mode: 'Hybrid',
    joiningLink: '',
    eventCoordinator: '',
    paid: 'Free',
    amountPayable: '',
    hashtags: '',
    loading: false,
    formData: new FormData(),
  });

  const [tempValue, settempValue] = useState({
    eventCoordinator: '',
    speaker: '',
    venue: '',
  })

  const preload = async () => {
    formData.set('paid',false)
    formData.set('mode','Hybrid')
  };
  
  useEffect(() => {
    preload();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorInSubmission(0);
  };

  const [instrArray, setInstrArray] = React.useState([]);

  const handleDelete = (chipToDelete) => () => {
    setInstrArray((chips) => chips?.filter((chip) => chip.key !== chipToDelete.key));
  };
  
  const dispatch = useDispatch()

  const Submit = event =>{
    dispatch(setLoader(true))

    event.preventDefault();

    formData.set('instructions',instrArray)
    editEvent(formData,eventId)
    .then( data =>{
      dispatch(setLoader(false))
      if(data.error){
          dispatch(setErrorMsg(data.message?data.message:'Error in Editing Event'))
      }
      else{
            dispatch(setSuccessMsg('Event Successfully Edited!'))
            setValues({
                ...values,
                title: '',
                description: '',
                instruction: '',
                speaker: '',
                venue: '',
                startTime: null,
                endTime: null,
                poster: '',
                mode: 'Hybrid',
                joiningLink: '',
                vaccineRequirement: '',
                paid: 'Free',
                amountPayable: '',
                hashtags: '',
                loading: false,
                error: '',
                createdProduct: false,
                formData: new FormData(),
              });
              props.history.push('/');
        }
    })
    .catch(()=>{
        dispatch(setLoader(false))
        dispatch(setErrorMsg('Error in editing Event'))
        console.log("Error in editing Event");
    })
}

  const venueAvailabilityCheck = (time,id)=>{
    return new Promise((resolve,reject)=>{
      venueList?.filter(e=>{console.log(e); return e._id===values.venue})[0]?.blockedDurations?.forEach((item,index)=>{
        console.log(new Date(item.startTime),new Date(time),new Date(item.endTime))
      
        if(new Date(item.startTime)<=new Date(time) && new Date(item.endTime)>=new Date(time)){//startTime or endTime shouldn't be between any duration
          reject('That\'s booked')
        }
        console.log(new Date(time),new Date(item.startTime),new Date(values.startTime))

        if(id==='endTime' && new Date(time)>=new Date(item.startTime) && new Date(values.startTime)<=new Date(item.startTime)){//if it's end time then the current duration should not have any blocked duration in between
          reject('That\'s booked/have a slot booked')
        }
      })
      resolve('valid')
    })
  }

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  
  const {
    mode,
    paid,
    formData
  } = values


  const handleChange = event =>{
    if(!event.target.id)
    event.target.id=event.target.name

    const v = event.target.id === "poster"? event.target.files[0]:event.target.value
    if(event.target.id === 'startTime' || event.target.id === 'endTime'){
    Promise.resolve(venueAvailabilityCheck(event.target.value,event.target.id))
      .then((res)=>{
        formData.set(event.target.id,v)
        setValues({
          ...values,error: false, [event.target.id]: event.target.value
        })   
      })
      .catch(err=>{
        alert(err)
      })
    }
    else{
    if(event.target.id !== 'paid')
    formData.set(event.target.id,v)
    else
    formData.set(event.target.id,v !== 'Free')

    setValues({
        ...values,error: false, [event.target.id]: event.target.value
      }) 
    }
}

const handleKeyDown = (event,index) =>{
  if (event.key === 'Enter') {
    instrArray.push({ key: index, label: event.target.value })
    setValues({
      ...values,error: false, [event.target.id]: ''
    }) 
  }
}

const [eventCoordinatorList,setSearchedUser] = useState([])
const [userSearch, setUserSearch] = useState('')


  useEffect(() => { 
    if(userSearch !== ''){      
      search({filter:'user',search:userSearch})
      .then(response => {
        console.log(response)
        setSearchedUser(response);
      })
      .catch(error => {
        console.log('Error in searching - ', error);
      })
    }
  }, [userSearch])

console.log(tempValue,"temp")
const currentList = (name) =>{
  switch(name){
    case "eventCoordinator":
      return eventCoordinatorList
    case "speaker":
      return speakerList
    case "venue":
      return venueList
    default:
      return []
  }
} 
const loader = useSelector(state => state?.loader);


  return (
      <>
      <Header />
    <Box className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Grid container className={classes.form}>
              {step.radioFields?.map((item,index)=>{
                  
                  return(
                      <Grid item container style={{marginBottom: "0.5em"}} lg={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Mode</FormLabel>
                            <RadioGroup row aria-label="gender" id={item.name} value={values[item.name]} onChange={handleChange} name={item.name}>
                                {item.values?.map((e,i)=>(
                                    <FormControlLabel value={e} control={<Radio />} label={e} />
                                ))}
                            </RadioGroup>
                            </FormControl>
                  </Grid>
                  )
              })}
              {step.fields?.map((item,index)=>{
                  
                  return(
                      <>
                    { (!mode || item?.avoid !== mode) && (!paid || item?.avoid !== paid) && (
                      <Grid item container style={{marginBottom: "0.5em"}} lg={12}>
                      <TextField 
                      value={values[item.name]}
                      onChange={handleChange}
                      onKeyDown={(e) => item.name==='instruction' && handleKeyDown(e,instrArray.length+1)}
                      className={classes.inputF}
                      id={item.name}
                      multiline={item.multiline}
                      rows={5}
                      label={item.name} />
                      {item.name === 'instruction' && (
                          instrArray.map((data,index) => {
                    
                            return (
                              <ListItem key={index}>
                                <Chip
                                  color="primary"
                                  label={data?.label}
                                  onDelete={data?.label === 'React' ? undefined : handleDelete(data)}
                                />
                              </ListItem>
                            );
                          })
                    
                        )}
                  </Grid>)}
                  </>
                  )
              })}

              {step.selectFields?.map((item,index)=>{
                  return(
                      <>
                    { (!mode || item?.avoid !== mode)  && (
                        <Grid item container style={{marginBottom: "2em",width:'50vw'}} lg={6}>
                        
                        <Autocomplete
                          disablePortal
                          id={item.name}
                          fullWidth
                          className={classes.inputF}
                          options={currentList(item?.name)?.map(e=>({...e,label:e?.name+" | "+(e?.collegeId ? e?.collegeId : e?.noOfSeats ? e?.noOfSeats : e?._id)}))}
                          sx={{ width: 300 }}
                          onChange = {(event,newValue)=>{
                            handleChange({target:{id:item?.name,value:newValue?._id}});
                            settempValue({...tempValue, [item?.name]:newValue})
                            
                          }}
                          value={tempValue[item?.name]}
                          renderInput={(params) => <TextField {...params} value={values[item?.name]} onChange={(e)=>{item?.name==='eventCoordinator' && setUserSearch(e.target.value)}}  label={item.name} />}
                        />
                    </Grid>)}
                  </>
                  )
              })}
              {step.files?.map((item,index)=>{
                  
                  return(
                    <Grid item container style={{marginBottom: "2em",width:'50vw'}} lg={12}>
                        <label htmlFor={item?.name}>
                            <Input accept="image/*" multiple type="file" value={values[item?.name]} onChange={handleChange} id={item.name} />
                            <Button variant="contained" component="span">
                                Upload {item?.name} Image
                            </Button>
                        </label>
                        <span className={classes.imageName}>{values[item?.name]?(<span>{values[item?.name].substring(12)}&nbsp; <span style={{fontWeight:'600',cursor:'pointer'}} onClick={()=>{setValues({...values, poster:''}) }}>X</span></span>):"No File Selected"}</span>
                    </Grid>
                  )
              })}
              
              {step.timeFields && mode!=="Virtual" && (
                <>
                {console.log(venueList,values.venue,venueList?.filter(e=>{ return e._id===values.venue}))}
                These are the blocked Durations for the chosen venue:
                {venueList?.filter(e=>{ return e?._id===values.venue})[0]?.blockedDurations?.map((item,index)=>(
                  <ListItem key={index}>
                    {item.eventId ? (
                    <a href={`/event/${item?.eventId?._id}`} target="_blank" style={{textDecoration:'none',cursor:'pointer'}} rel="noreferrer">
                  <Chip
                    color="primary"
                    label={`${moment(item?.startTime).toString().substring(4,26)}`+" to "+`${moment(item?.endTime).toString().substring(4,30)}`}
                  />
                  </a>
                  ):(
                  <Chip
                    color="primary"
                    label={`${moment(item?.startTime).toString().substring(4,26)}`+" to "+`${moment(item?.endTime).toString().substring(4,30)}`}
                  />
                  )}
                  <div className={classes.ideaActions}>
                    <a href={`callto:${item?.eventId?.eventCoordinator?.contactNumber}`} target="_blank" style={{textDecoration:'none',cursor:'pointer'}} rel="noreferrer">
                      <DurationTooltip title="Call the Event Coordinator to request venue/time change" aria-label="add" arrow>
                        <CallIcon sx={{color:'#d3d3d3'}}/>
                      </DurationTooltip>
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href={`mailto:${item?.eventId?.eventCoordinator?.email}`} target="_blank" style={{textDecoration:'none',cursor:'pointer'}} rel="noreferrer">
                      <DurationTooltip title="Mail the Event Coordinator to request venue/time change" aria-label="add" arrow>
                        <EmailIcon sx={{color:'#d3d3d3'}}/>
                      </DurationTooltip>
                    </a>
                    
                  </div> 
                </ListItem>
                ))}
                </>
              )}
              {step.timeFields?.map((item,index)=>{
                  
                  return(
                    <Grid item container style={{marginBottom: "0.5em",width:'50vw'}} lg={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            className={classes.inputF}
                            label={item?.name}
                            value={values[item?.name]}
                            id={item.name}
                            disabled = {item?.name === 'endTime' && !values['startTime']}
                            minDate = {new Date()}
                            minDateTime = {item?.name === 'endTime' ? values?.startTime : undefined}
                            onChange={(value)=>handleChange({target:{value,id : item?.name}})}
                            renderInput={(params) => <TextField className={classes.dateF} {...params} />}
                            />
                        </LocalizationProvider>
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

export default withRouter(EventEditForm);
