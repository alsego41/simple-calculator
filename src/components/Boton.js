const Boton = (props) => {
    return (
        <div className='boton' onClick={props.updDisplay}>
            {props.text}
        </div>
    )
}

export default Boton