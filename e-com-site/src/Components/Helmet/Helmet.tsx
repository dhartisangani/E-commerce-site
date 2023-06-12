import React from "react";

function Helmet(props: any) {
  document.title = "E-Mart - " + props.title;
  return <div>{props.children}</div>;
}

export default Helmet;
