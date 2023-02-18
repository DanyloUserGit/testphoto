import '.././App.css';
export const Addbtn = (props) => {
    return(
        <input type="button" className = {"Addbtn"} value='+' onClick={props.onclickHandle} disabled={props.turnOn}/>
    );  
};  
export const Camerabtn = (props) => {
    return(
        <input type="button" className={"Camerabtn"} onClick={props.onclickHandle} style={props.style}/>
    );
}