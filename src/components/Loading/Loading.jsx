import React from 'react'
import './Loading.scss'
const Loading = props => {
    return (
        <div className="container">
            <div className="loading-container">
                <div className="loading-label">
                    <span className="loading-round"></span>
                    <span className="loading-round"></span>
                </div>
                <div>Loading...</div>
            </div>
        </div>
    )
}


export default Loading
