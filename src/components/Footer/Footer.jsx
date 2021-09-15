import React from 'react'
import './Footer.scss'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-title">
                <span>Code by </span>
                <a href="https://github.com/trungle1403" target="_blank" rel="noreferrer">
                    <i class='bx bxl-github'></i>
                    <span>Trung Le</span>
                </a>
            </div>
            <p className="footer-subtitle">&#169; 2021</p>
            
        </footer>
    )
}

export default Footer
