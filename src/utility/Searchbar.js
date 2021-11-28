/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputBase  } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { storeSearchedData, storeSearchResults, handleSearchLoading } from './../action/action';
import { search } from './../apicalls/index';
import { switchSearchedId } from './../action/action';

const useStyles = makeStyles(
  theme =>({
    root:{
      margin:'auto',
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
)

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '0.7em',
  border: '2px solid black',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15rem'
    },
  },
}));


export const SearchBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [searchData, setSearchData] = useState('');
  const [searchedResponse, setSearchedResponse] = useState([]);

  const searchId = useSelector(state => state.searchedId);
  const searchString = useSelector(state => state.searchedData);

  const searchFilter = [ 'user','speaker','event'];
  const searchRequest = {
    limit: 7,
    filter: searchFilter[searchId],
    search: ''
  };

  const debounce = (func, delay) => {
		let deb;
		return () => {
			clearTimeout(deb);
			deb = setTimeout(func, delay);
		};
	};

  const handleSearchData = event => {
    setSearchData(event.target.value);
    const time = debounce(() => {
			dispatch(storeSearchedData(event.target.value));
		}, 1000);
		time();
    if(!event.target.value) dispatch(switchSearchedId(0));
  }

  useEffect(() => {
    dispatch(handleSearchLoading(true));
    searchRequest.filter = searchFilter[searchId];
    if(searchString !== ''){      
      searchRequest.search = searchString;
      search(searchRequest)
      .then(response => {
        setSearchedResponse(response);
        dispatch(storeSearchResults(response));
      })
      .catch(error => {
        console.log('Error in searching - ', error);
      })
    }
    dispatch(handleSearchLoading(false));
  }, [searchId, searchString])

  return(
        <Search className={classes.root}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search Speakers, Students, etc."
                inputProps={{ 'aria-label': 'search' }}
                style={{color:"#222",margin:'auto',width:'75vw'}}
                value={searchData}
                onChange={handleSearchData}
            />
        </Search>
  )
}
