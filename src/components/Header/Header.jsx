import React, {useRef, useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './header.scss'
const mainNav = [
    {
        display: 'Trang chủ',
        path: '/'
    },
    {
        display: 'Phim Lẻ',
        path: '/type/movie'
    },
    {
        display: 'Phim Bộ',
        path: '/type/show'
    },
    {
        display: 'Tìm kiếm',
        path: '/search'
    },
]
const Header = () => {
    const {pathname} = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname);

    // active on click in mobile
    const navRef = useRef();
    const navOverlayRef = useRef();
    const navToggle = () => {
        navRef.current.classList.toggle('active');
        navOverlayRef.current.classList.toggle('active');
    }
    
    //header sticky
    const headerRef = useRef(null)
    useEffect(() => {
        window.addEventListener('scroll', () =>{
            if( document.body.scrollTop  > 100 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky');
            }else{
                headerRef.current.classList.remove('sticky');
            }
        })
        return () => {
            window.removeEventListener('scroll');
        };
    }, [])
    
    const storedTheme = localStorage.getItem('movie-theme')
    const [theme, setTheme] = useState(storedTheme)
    useEffect(()=> {
        const checkbox = document.querySelector('#toggleDarkMode')
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('movie-theme', theme);
        if(theme === 'light'){
            checkbox.checked = true;
        }else{
            checkbox.checked = false;
        }
        
    },[theme])
    
    const handleChangeTheme = () => {
        const checkbox = document.querySelector('#toggleDarkMode')
        if(checkbox.checked){
            setTheme("light")
        }else{
            setTheme("dark")
        }
    }
    return (
        <header className="header" ref={headerRef}>
            <nav className="nav">
                <div className="nav-links">
                    <Link to='/' className="nav-logo">
                            <img src={logo} alt="" className="nav-logo-img" />
                    </Link>
                    <div className="nav-overlay" ref={navOverlayRef} onClick={() => navToggle()}></div>
                    <ul className="nav-list" ref={navRef}>
                        {
                            mainNav.map( (item,index) => (
                                <li key={index} className="nav-item" onClick={() => navToggle()}>
                                    <Link  className={`nav-link ${index === activeNav ? 'active' : ''}`} to={item.path} >
                                        {item.display}
                                    </Link>
                                </li>
                            ))
                        }
                        <li className="nav-item nav-close" onClick={() => navToggle()} >
                            <i class='bx bxs-chevrons-right'></i>
                        </li>
                        <div className="nav-active-hidden">
                            <Link to='/collection' onClick={() => navToggle()} className='btn-custom nav-collection'>
                            <i class='bx bx-add-to-queue'></i> <span>Bộ sưu tập</span></Link>
                        </div>
                    </ul>
                </div>
                <div className="nav-action">
                    <Link to='/search' className='nav-link nav-search'><i class='bx bx-search' ></i></Link>
                    <Link to='/collection' className='btn-custom nav-collection'>
                    <i class='bx bx-add-to-queue'></i> <span>Bộ sưu tập</span></Link>
                    <div className="nav-toggle"  onClick={() => navToggle()}>
                        <i class='bx bx-menu'></i>
                    </div>
                    <label className="switch toggle-theme-desktop" 
                    onClick={() =>handleChangeTheme("desktop")}
                    >
                        <input type="checkbox" id="toggleDarkMode" /> 
                        <span className="slider">
                            <span className="label-light">light</span>
                            <span className="label-dark">dark</span>
                            <i class='bx bxs-sun label-icon icon-light'></i> 
                            <i class='bx bxs-moon label-icon icon-dark'></i>
                        </span>
                    </label>
                </div>
            </nav>
        </header>
    )
}

export default Header
