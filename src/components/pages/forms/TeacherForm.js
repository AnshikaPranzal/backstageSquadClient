import * as React from 'react';
import { 
    TextField, 
    Grid,  
    Typography, 
    Button, 
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper, 
    Snackbar, 
    Autocomplete} from '@mui/material';
// import { makeStyles } from '@mui/styles'
import theme from '../../../theme/Theme';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Header from '../../../utility/Header';
import { editUser } from '../../../apicalls/auth';
import { search } from '../../../apicalls';
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
  selectF:{
    width:'50vw',
    height:'3rem',
    // padding:'27px 14px',
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


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const steps = [
  {
    label: 'Upgrade to Teacher',
    description:
      'Give access to your fellow teachers and make your team a strong one!! Start typing the teacher\'s id or name below',
    
    selectFields:[
        {name:'collegeId',required:true},
    ],
  }
];


export default function TeacherForm() {
  const [activeStep, setActiveStep] = React.useState(0);


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const classes = useStyles();

  const [errorInSubmission, setErrorInSubmission] = useState(0);

  const [values, setValues] = useState({
    collegeId: '',
    role: 1,
    getaRedirect: false,
    formData: new FormData(),
  });


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorInSubmission(0);
  };

  const [instrArray, setInstrArray] = React.useState([]);

  const dispatch = useDispatch()

  const Submit = event =>{
    dispatch(setLoader(true))

    event.preventDefault();

    editUser(values)
    .then( data =>{
      dispatch(setLoader(false))
       
        if(data.error){
          dispatch(setErrorMsg(data.message?data.message:'Error in Upgrading to Teacher'))

        }
        else{
          dispatch(setSuccessMsg('Teacher Successfully Upgraded!'))

            setValues({
                ...values,
                collegeId: ''
              });
              setErrorInSubmission(-1);
        }
    })
    .catch(()=>{
        console.log("Error in Upgrading the user");
        dispatch(setLoader(false))
        dispatch(setErrorMsg('Error in Upgrading the user'))
    })
}

  const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
  };

  const[id,setId] = useState('')

const handleChange = event =>{

    setValues({
        ...values,error: false, [event.target.id]: event.target.value
      }) 
    }

const [collegeIdList,setSearchedUser] = useState([])
const [userSearch, setUserSearch] = useState('')


React.useEffect(() => {
  
  if(userSearch !== ''){      
    search({filter:'user',search:userSearch})
    .then(response => {
      console.log(response)
      setSearchedUser(response);
      // dispatch(storeSearchResults(response));
    })
    .catch(error => {
      console.log('Error in searching - ', error);
    })
  }
  // dispatch(handleSearchLoading(false));
}, [userSearch])

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

              {step.selectFields?.map((item)=>{
                  return(
                      <>
                        <Grid item container style={{marginBottom: "2em",width:'50vw'}} lg={6}>
                        
                              <Autocomplete
                                disablePortal
                                id={item.name}
                                fullWidth
                                className={classes.inputF}
                                options={collegeIdList?.filter(e=>(e.role === 0)).map(e=>({...e,label:e.name+" | "+e._id}))}
                                // sx={{ width: 300 }}
                                onChange = {(event,newValue)=>{
                                  handleChange({target:{id:item.name,value:newValue._id}})
                                }}
                                renderInput={(params) => <TextField {...params} value={values[item.name]} onChange={(e)=>{item.name==='collegeId' && setUserSearch(e.target.value)}}  label={item.name} />}
                              />
                        </Grid>
                      </>
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
                    {index === steps.length - 1 ? 'Update' : 'Continue'}
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
          <Typography>All iformation saved - you&apos;re finished</Typography>
          <Button onClick={Submit} sx={{ mt: 1, mr: 1 }}>
            Create Teacher
          </Button>
          <Button
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
            >
            Back
            </Button>
        </Paper>
      )}
    </Box>
    
    </>
  );
}

