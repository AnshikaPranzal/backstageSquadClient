import React from "react";
import Header from '../../utility/Header';
import AllEvents from "../Allevents";
import Ideas from "../Ideas";
import SearchContent from "../SearchContent";
import { useSelector } from 'react-redux';
import AddButtons from "../AddButtons";

const LandingPage = () => {
  const searchedData = useSelector(state => state?.searchedData);
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
        </>
      )}      
    </div>
  );
};

export default LandingPage;
