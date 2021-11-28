import styled from "@emotion/styled/macro";
export const Hover = styled.div({
    opacity: 0,
    transition: "opacity 350ms ease",
});

export const SubTitle = styled.h4({
    fontFamily: "Helvetica",
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
    position: "absolute",
    top: "50%",
    left: "45%",
    color: "white"
});
  
  
export const Paragraph = styled.p({
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
    position: "absolute",
    top: "60%",
    left: "42%",
    color: "white"
});

export const DisplayOver = styled.div({
    height: "100%",
    left: "0",
    position: "absolute",
    top: "0",
    width: "100%",
    zIndex: 2,
    transition: "background-color 350ms ease",
    backgroundColor: "transparent",
    padding: "20px 20px 0 20px",
    boxSizing: "border-box",
});


export const Background = styled.div({
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "primary",
    position: "relative",
    width: "100%",
    height: "70vh",
    cursor: "pointer",
    backgroundImage: `url(https://images.pexels.com/photos/4207779/pexels-photo-4207779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`,
    [`:hover ${DisplayOver}`]: {
        backgroundColor: "rgba(0,0,0,.75)",
        border: "10px solid black"
      },
      [`:hover ${SubTitle}, :hover ${Paragraph}`]: {
        transform: "translate3d(0,0,0)",
      },
      [`:hover ${Hover}`]: {
        opacity: 1,
      },
});

