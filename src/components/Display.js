const Display = props => {
    return (
        <>
            <div id='display-last' className='display' onClick={props.copyContent}>
                <p>{props.lastText}</p>
                {/* {props.lastText} */}
            </div>
            <div id='display-main' className='display'>
            {/* {props.mainText} */}
                <p>{props.mainText}</p>
            </div>
        </>
    )
}

export default Display