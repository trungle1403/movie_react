import React, {useRef, useEffect} from 'react'
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
        display: 'Tất cả phim',
        path: '/all'
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
        window.addEventListener('scroll', (e) =>{
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
                                <li key={index} className="nav-item">
                                    <Link  className={`nav-link ${index === activeNav ? 'active' : ''}`} to={item.path} >
                                        {item.display}
                                    </Link>
                                </li>
                            ))
                        }
                        <li className="nav-item nav-close" onClick={() => navToggle()} >
                            <i class='bx bxs-chevrons-left'></i>
                        </li>
                    </ul>
                </div>
                <div className="nav-action">
                    <Link to='/search' className='nav-link nav-search'><i class='bx bx-search' ></i></Link>
                    <Link to='/login' className='btn-custom nav-login'>Đăng nhập</Link>
                    <div className="nav-toggle"  onClick={() => navToggle()}>
                        <i class='bx bx-menu'></i>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
