import React, { Component } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import Link from 'next/link'

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home',
        submenu: [
            {
                id: 11,
                title: 'Home style 1',
                link: '/home'
            },
            {
                id: 12,
                title: 'Home style 2',
                link: '/home2'
            },
            {
                id: 13,
                title: 'Home style 3',
                link: '/home3'
            },
        ]
    },

    {
        id: 2,
        title: 'Room',
        link: '/room',
        submenu: [
            {
                id: 21,
                title: 'Room',
                link: '/room'
            },
            {
                id: 22,
                title: 'Room Single',
                link: '/room-single/Apartment'
            }
        ]
    },
    {
        id: 3,
        title: 'Destination',
        link: '/destination',
        submenu: [
            {
                id: 21,
                title: 'Destination',
                link: '/destination'
            },
            {
                id: 22,
                title: 'Destination Single',
                link: '/destination-single/Paris,France'
            }
        ]
    },
    
    {
        id: 7,
        title: 'Pages',
        link: '/',
        submenu: [
            {
                id: 71,
                title: 'About',
                link: '/about'
            },
            {
                id: 79,
                title: 'Error 404',
                link: '/404'
            },
            {
                id: 87,
                title: 'Search Result',
                link: '/search-result'
            },
            {
                id: 80,
                title: 'Login Page',
                link: '/404'
            },
            {
                id: 81,
                title: 'Signup Page',
                link: '/register'
            },
            {
                id: 82,
                title: 'Forgot Password',
                link: '/forgot-password'
            },

        ]
    },

    {
        id: 4,
        title: 'Service',
        link: '/service',
        submenu: [
            {
                id: 41,
                title: 'Service',
                link: '/service'
            },
            {
                id: 42,
                title: 'Service Single',
                link: '/service-single/Delicious-Food'
            }
        ]
    },

    {
        id: 5,
        title: 'Blog',
        link: '/blog',
        submenu: [
            {
                id: 51,
                title: 'Blog',
                link: '/blog'
            },
            {
                id: 52,
                title: 'Blog Left sidebar',
                link: '/blog-left-sidebar'
            },
            {
                id: 53,
                title: 'Blog full width',
                link: '/blog-fullwidth'
            },
            {
                id: 54,
                title: 'Blog single',
                link: '/blog-single/You’re-In-Dubai'
            },
            {
                id: 55,
                title: 'Blog single Left sidebar',
                link: '/blog-single-left-sidebar/You’re-In-Dubai'
            },
            {
                id: 56,
                title: 'Blog single Left sidebar',
                link: '/blog-single-fullwidth/You’re-In-Dubai'
            },
        ]
    },
    {
        id: 88,
        title: 'Contact',
        link: '/contact',
    }


]


export default class MobileMenu extends Component {

    state = {
        isMenuShow: false,
        isOpen: 0,
    }

    menuHandler = () => {
        this.setState({
            isMenuShow: !this.state.isMenuShow
        })
    }

    setIsOpen = id => () => {
        this.setState({
            isOpen: id === this.state.isOpen ? 0 : id
        })
    }

    render() {

        const { isMenuShow, isOpen } = this.state;

        const ClickHandler = () => {
            window.scrollTo(10, 0);
        }

        return (
            <div>
                <div className={`mobileMenu ${isMenuShow ? 'show' : ''}`}>
                    <div className="menu-close" onClick={this.menuHandler}><i className='fi ti-close'></i></div>
                    <ul className="responsivemenu">
                        {menus.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.submenu ? <p onClick={this.setIsOpen(item.id)}>
                                        {item.title}
                                        {item.submenu ? <i className="fa fa-angle-right" aria-hidden="true"></i> : ''}
                                    </p> : <Link href={item.link}>{item.title}</Link>}
                                    {item.submenu ?
                                        <Collapse isOpen={item.id === isOpen}>
                                            <Card>
                                                <CardBody>
                                                    <ul>
                                                        {item.submenu.map(submenu => (
                                                            <li key={submenu.id}><Link onClick={ClickHandler} className="active" href={submenu.link}>{submenu.title}</Link></li>
                                                        ))}
                                                    </ul>
                                                </CardBody>
                                            </Card>
                                        </Collapse>
                                        : ''}
                                </li>
                            )
                        })}
                    </ul>

                </div>

                <div className="showmenu" onClick={this.menuHandler}><i className="fa fa-bars" aria-hidden="true"></i></div>
            </div>
        )
    }
}
