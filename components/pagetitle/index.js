import React from 'react'
import Link from 'next/link'

const PageTitle = (props) => {
    return(
        <section className="page-title">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                    <h2 style={{ fontSize: '50px' }}>{props.pageTitle}</h2>
                        <ol className="breadcrumb">
                            <h2 style={{ fontSize: '50px' }}>{props.pagesub}</h2>

                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageTitle;