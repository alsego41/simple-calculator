import NotificationBox from './NotificationBox'

const Display = props => {
    return (
        <>
            <div id='display-last' className='display'>
                <p>{props.lastText}</p>
                <div id='grid-icons'>
                    <NotificationBox text='Copied!' />
                    <div className='icons' id='lastd-copyc' onClick={props.copyClipboard}>
                        <svg width="30" height="30" viewBox="0 10 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34 66.9999C31.7909 66.9999 30 65.2091 30 62.9999V37.0019V29.0003C30 26.7909 31.7913 24.9999 34.0007 25.0003L42.1905 25.0018L57.9996 25C60.2089 24.9998 62 26.7907 62 29L62 62.9999C62 65.2091 60.2091 66.9999 58 66.9999H34Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M30 54.9999H22C19.7909 54.9999 18 53.2091 18 50.9999L18 17C18 14.7907 19.7911 12.9998 22.0004 13L45.9993 13.0003C48.2087 12.9999 50 14.7909 50 17.0003V25.0009" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className='icons' onClick={props.copyContent}>
                        <svg width="30" height="30" viewBox="0 15 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='arrowh' d="M24 37.9995L37.8787 24.1209C39.0503 22.9493 40.9497 22.9493 42.1213 24.1209L56 37.9995" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" transform="scale(1, -1) translate(0, -86)" />
                            <path className='stick' d="M40 23.2412V37.979M40 38.0003L40 61.0003" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" />
                            {/* <path className='hrz-line' d="M24 15L56 15" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" transform="scale(1, -1) translate(0, -86)" /> */}
                        </svg>
                    </div>
                </div>
                
            </div>
            <div id='display-main' className='display'>
                <NotificationBox text='Copied!' />
                <div className='icons' id='maind-copyc' onClick={props.copyClipboard}>
                    <svg width="50" height="50" viewBox="0 10 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M34 66.9999C31.7909 66.9999 30 65.2091 30 62.9999V37.0019V29.0003C30 26.7909 31.7913 24.9999 34.0007 25.0003L42.1905 25.0018L57.9996 25C60.2089 24.9998 62 26.7907 62 29L62 62.9999C62 65.2091 60.2091 66.9999 58 66.9999H34Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M30 54.9999H22C19.7909 54.9999 18 53.2091 18 50.9999L18 17C18 14.7907 19.7911 12.9998 22.0004 13L45.9993 13.0003C48.2087 12.9999 50 14.7909 50 17.0003V25.0009" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <p>{props.mainText}</p>
            </div>
        </>
    )
}

export default Display