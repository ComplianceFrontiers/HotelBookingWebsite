import React from 'react'

const Counter = (props) => {

    const counter = [
        {
          Ficon:'fi flaticon-key',
          heading:"Amazing Rooms",
          data:"205",
        },
        {
          Ficon:'fi flaticon-staff',
          heading:"Dadicated Staffs",
          data:"560",
        },
        {
          Ficon:'fi flaticon-bowling',
          heading:"Delicious Food",
          data:"180",
        },
        {
          Ficon:'fi flaticon-pool',
          heading:"Swimming Pools",
          data:"8",
        },
    ]

    return(
      <div className="wpo-counter-area">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="wpo-counter-grids">
                          {counter.map((count, cnt) => (
                              <div className="grid" key={cnt}>
                                  <div className="wpo-counter-icon">
                                      <i className={count.Ficon}></i>
                                  </div>
                                  <div>
                                      <h2>{count.data} +</h2>
                                  </div>
                                  <p>{count.heading}</p>
                              </div>
                          ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Counter;