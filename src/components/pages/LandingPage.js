import React from "react";
import Header from '../../utility/Header';
import AllEvents from "../Allevents";
import Ideas from "../Ideas";
import SearchContent from "../SearchContent";
import { useSelector } from 'react-redux';
import AddButtons from "../AddButtons";
import VenueList from "../Venues";

const LandingPage = () => {
  const searchedData = useSelector(state => state?.searchedData);
  const user = useSelector(state => state?.user);
  return (
    <div>
      <Header />
      {searchedData ? (
        <div style={{height:'88vh',paddingTop:'5vh',paddingBottom:'2vh',width:'100%'}}>
          <SearchContent/> 
        </div>
        ) : (
        <>
          <AllEvents />
          <Ideas />
          <AddButtons/>
          {(user && user.role === 1) && <VenueList />}
        </>
      )}      
    </div>
  );
};

export default LandingPage;
