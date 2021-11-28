import React from "react";
// import Footer from "./Footer";
import Header from "./Header";

const Item = (props) => {
    const { level,items } = props
    const items = [
        {id : 1, eventName : "Event1",
         image : "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"},
        {id : 2, eventName : "Event2",
         image : "https://www.w3schools.com/w3css/img_lights.jpg"},
        {id : 3, eventName : "Event3",
         image : "https://static.addtoany.com/images/dracaena-cinnabari.jpg"},
        {id : 4, eventName : "Event4",
         image : "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {id : 5, eventName : "Event5",
         image : "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {id : 6, eventName : "Event6",
         image : "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"},
        {id : 7, eventName : "Event7",
         image : "https://www.w3schools.com/w3css/img_lights.jpg"},
        {id : 8, eventName : "Event8",
         image : "https://static.addtoany.com/images/dracaena-cinnabari.jpg"}
    ];

    const className = 'item level' + this.props.level
    return(
        <React.Fragment>
            <div className={className} style={{backgroundImage: `url(${this.state.item.image})`, backgroundSize: '100% 100%'}}>
                <Typography className="imgText"></Typography>{this.state.item.name}
            </div>
        </React.Fragment>
    )
};

export default Item;
