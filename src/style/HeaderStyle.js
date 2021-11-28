/* eslint-disable import/no-anonymous-default-export */
import { createStyles } from '@mui/styles';

export default theme =>
	createStyles({
        root:{
            backgroundColor:'transparent'
        },
        headerContent : {
            display : "flex",
            width: '100vw'
            // color : "#ffffff",
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
    });