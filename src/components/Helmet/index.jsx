import React from 'react'
import PropTypes from 'prop-types'

const Helmet = props => {
    let title = props.title || "Xem phim chất lượng cao";
    document.title =  title
    return (
        <div>
            {props.children}
        </div>
    )
}

Helmet.propTypes = {
    title: PropTypes.string
}

Helmet.defaultProps = {
    title: ''
}
export default Helmet
