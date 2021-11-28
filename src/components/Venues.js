import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';

export default function VenueList() {
  const [expanded, setExpanded] = React.useState(false);

  const venueList = useSelector(state => state?.allVenues);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{width:'80vw',margin:'auto'}}>
      <Typography variant='h3'>All Venues:</Typography>
      <div style={{marginBottom:'3em',marginTop:'2em'}}>
        {venueList.map((item,index)=>(
              <>
                <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {item.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>seats: {item.noOfSeats}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Address: {item.address}
                        
                    </Typography>
                    </AccordionDetails>
                </Accordion>
              </>
          ))}
      
      </div>
    </div>
  );
}
