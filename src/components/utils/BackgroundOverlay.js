

const BackgroundOverlay = ({showModal}) => {
    return (
        <div className={showModal ? 'backgroundOverlay open' : 'backgroundOverlay'}></div>
    )
}

export default BackgroundOverlay
