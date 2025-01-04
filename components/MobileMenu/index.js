import React, { Component } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import Link from 'next/link'

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home',
       
    },

    {
        id: 2,
        title: 'Rentals',
        link: '/room',
        submenu: [

            {
                id: 21,
                title: 'Gym',
                link: '/destination-single/gymnasium'
            },
            {
                id: 22,
                title: 'Multi-Purpose Room',
                link: '/destination-single/mpr'
            }, {
                id: 23,
                title: 'Conference Center',
                link: '/destination-single/conferenceCenter'
            },
            {
                id: 24,
                title: 'Auditorium',
                link: '/destination-single/gymnasium'
            },
            {
                id: 25,
                title: 'Pavilion',
                link: '/destination-single/pavilion'
            },{
                id: 26,
                title: 'Firepit',
                link: '/destination-single/firepit'
            }
        ]
    },
    {
        id: 3,
        title: 'Scheduling',
        link: '/events',
        
    },
    
   
    {
        id: 4,
        title: 'Services',
        link: '/service',
       
    },

    {
        id: 5,
        title: 'Gallery',
        link: '/Gallery',
        
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
