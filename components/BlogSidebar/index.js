import React from 'react';
import Link from 'next/link'
import blogs from '../../api/blogs'
import Image from 'next/image';
import Services from '../../api/service'

import about from '/public/images/blog/profile.png'
import bicon from '/public/images/blog/icon.png'


const BlogSidebar = (props) => {

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }


    return (
        <div className={`col col-lg-4 col-12 ${props.blLeft}`}>
            <div className="wpo-blog-sidebar">
                <div className="widget profile-widget">
                    <div className="profile-img">
                        <Image src={about} alt="" />
                        <h2>Noumi Bartler</h2>
                        <p>Hi! here is our blog. Read our post - and be with us</p>
                    </div>
                    <div className="pro-social">
                        <ul>
                            <li><Link onClick={ClickHandler} href="/blog"><i className="ti-facebook"></i></Link></li>
                            <li><Link onClick={ClickHandler} href="/blog"><i className="ti-twitter-alt"></i></Link></li>
                            <li><Link onClick={ClickHandler} href="/blog"><i className="ti-instagram"></i></Link></li>
                            <li><Link onClick={ClickHandler} href="/blog"><i className="ti-google"></i></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="widget search-widget">
                    <form onSubmit={SubmitHandler}>
                        <div>
                            <input type="text" className="form-control" placeholder="Enter Keyword..." />
                            <button type="submit"><i className="ti-search"></i></button>
                        </div>
                    </form>
                </div>
                <div className="widget category-widget">
                    <h3>Categories</h3>
                    <ul>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Hotel Management<span>(8)</span></Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Vacational Plan<span>(5)</span></Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">World Tour <span>(7)</span></Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Guide Information<span>(3)</span></Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Travelling <span>(6)</span></Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Hotel Room <span>(2)</span></Link></li>
                    </ul>
                </div>
                <div className="widget recent-post-widget">
                    <h3>Recent posts</h3>
                    <div className="posts">
                        {blogs.map((blog, Bitem) => (
                            <div className="post" key={Bitem}>
                                <div className="img-holder">
                                    <Image src={blog.screens} alt="" />
                                </div>
                                <div className="details">
                                    <h4><Link onClick={ClickHandler} href="/blog-single/[slug]" as={`/blog-single/${blog.slug}`}>{blog.title}</Link></h4>
                                    <span className="date">{blog.create_at}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="widget instagram">
                    <h3>Service</h3>
                    <ul className="d-flex">
                    {Services.map((service, sev) => (
                        <li  key={sev}><Link onClick={ClickHandler} href="/service-single/[slug]" as={`/service-single/${service.slug}`}><Image src={service.simg1} alt="" /></Link></li>
                    ))}
                    </ul>
                </div>
                <div className="widget tag-widget">
                    <h3>Tags</h3>
                    <ul>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Travelling</Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Hotel</Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Restaurant</Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Destination</Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">World Tour</Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Hotel Room</Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Spa</Link></li>
                        <li><Link onClick={ClickHandler} href="/blog-single/You’re-In-Dubai">Guide</Link></li>
                    </ul>
                </div>
                <div className="widget get-intouch">
                    <div className="get-item">
                        <Image src={bicon} alt="" />
                        <h2>Let’s start your dreamy journey</h2>
                        <Link onClick={ClickHandler} className="theme-btn" href="/contact">Get in touch</Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BlogSidebar;
