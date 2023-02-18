import '.././App.css';
export const Username = (props) =>{
    return(
        <h2 className={"username"} style={{marginLeft: props.margin + "vw", marginTop: props.margin/4 + "vw"}}>{props.name}</h2>
    );
};