import React from 'react'
import Link from 'next/link'
import blogs from '../../api/blogs'
import Image from 'next/image'

const BlogSection = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="blog-area ptb-100-70">
            <div className="container">
                <div className="col-12">
                    <div className="wpo-section-title">
                        <span>Blog Post</span>
                        <h2>Our Latest News</h2>
                    </div>
                </div>
                <div className="row">
                    {blogs.map((blog, Bitem) => (
                        <div className="col-lg-4 col-md-6 col-12" key={Bitem}>
                            <div className="blog-item">
                                <div className="blog-img">
                                    <Image src={blog.screens} alt="" />
                                </div>
                                <div className="blog-content">
                                    <ul className="post-meta">
                                        <li><Link onClick={ClickHandler} href="/blog-single/[slug]" as={`/blog-single/${blog.slug}`}>{blog.Thumb}</Link></li>
                                        <li>{blog.date}</li>
                                    </ul>
                                    <h3><Link onClick={ClickHandler} href="/blog-single/[slug]" as={`/blog-single/${blog.slug}`}>{blog.title}</Link></h3>
                                    <Link onClick={ClickHandler} href="/blog-single/[slug]" as={`/blog-single/${blog.slug}`}>Continue</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogSection;