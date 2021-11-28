import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, 
        Toolbar, 
        Typography, 
        useScrollTrigger, 
        Grid,
        Hidden,
        useMediaQuery} from '@mui/material';
import { makeStyles } from '@mui/styles'
import { SearchBar } from './Searchbar';
import theme from '../theme/Theme';
import { useSelector } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import UserMenu from './UserMenu';

const useStyles = makeStyles({
    root:{
      backgroundColor:'#d3d3d3',
      height: '20vh'
    },
    headerContent : {
        display : "flex",
        width: '100vw'
    },
    search : {
        marginLeft: '20rem'
    },
    button: {
        height:'2rem', 
        color: 'inherit',
        width: '15rem'
    },
    userButton:{
        position: 'relative',
        float: 'right',
        marginLeft: 'auto', 
        marginRight: 0
    }
  })



const ElevationScroll = props => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};


const HeaderContent = ({pathname}) => {
  const classes = useStyles();
  const userName = useSelector(state => state?.user?.name);
  const user = (userName && userName !== '') ? userName : "Username"; 

  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"))
  const matchesMd = useMediaQuery(theme.breakpoints.down("lg"))
  return(
    <React.Fragment className={classes.root}>
    <AppBar>
          <Toolbar style={{backgroundColor: '#d3d3d3'}}>
          <div className={classes.headerContent}>
            <Grid container>
              {pathname === "/" ? <Hidden lgDown>
              <Grid item lg={4}>
                <Link style={{textDecoration:'none',color:'inherit'}} to="/">
                <Typography variant="h6" component="div" >
                  Backstage Squad
              </Typography>
                </Link>
              </Grid>
              </Hidden>:
              <Grid item lg={4}>
                <Link style={{textDecoration:'none',color:'inherit'}} to="/">
                <Typography variant="h6" component="div" >
                  Backstage Squad
                </Typography>
                </Link>
              </Grid>}
              <Grid item lg={4} sm={11} alignItems='center'>
               {pathname==='/' && <SearchBar />}
              </Grid>
              <Grid item lg={4} sm={1}>
                <div className={classes.userButton}> 
                  {/* <Button variant="text" style={{ color: 'inherit'}}>
                    {matchesMd? user[0] : user}
                    <KeyboardArrowDownIcon/>
                  </Button> */}
                  <UserMenu name={user[0]}/>
                </div>   
              </Grid>
            </Grid>
            
                    
          </div>
          </Toolbar>
        </AppBar>
        </React.Fragment>
  );
}

const Header = (props) => {
  console.log(props)
  return (
    <React.Fragment>
      <ElevationScroll>
        <HeaderContent pathname={props.location.pathname}/>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

export default withRouter(Header)
