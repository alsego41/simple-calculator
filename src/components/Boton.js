const Boton = (props) => {
    return (
        <div className='boton noselect' onClick={props.updDisplay}>
            {props.text}
        </div>
    )
}

export default Boton