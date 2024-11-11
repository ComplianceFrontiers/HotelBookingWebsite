import React, { Fragment } from 'react';
import { useRouter } from 'next/router'
import Navbar from '../../../components/Navbar';
import PageTitle from '../../../components/pagetitle';
import Scrollbar from '../../../components/scrollbar'
import Destinations from '../../../api/destination'
import Benefits from '.././benefits'
import DestinationSidebar from '.././sidebar'
import Footer from '../../../components/footer';
import dimg1 from '/public/images/destination-single/21.jpg'
import dimg2 from '/public/images/destination-single/31.jpg'
import Image from 'next/image';


const DestinationSinglePage = (props) => {

    const router = useRouter()

    const destinationDetails = Destinations.find(item => item.slug === router.query.slug)


    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} />
            <PageTitle  pagesub={'Gymnasium'} />
            <section className="wpo-destination-single-section section-padding">
  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-12">
        <div className="wpo-destination-single-wrap">
          <div className="wpo-destination-single-content">
          <Image 
              src="/images/destination/img-1.jpg" 
              alt="Gymnasium Image" 
              width={500} 
              height={300} 
            />            
            <div className="wpo-destination-single-content-des">
              <h2>Experience Our State-of-the-Art Gymnasium</h2>
              <p>
                Step into our newly renovated gymnasium, designed to combine modern comfort with eco-conscious features. Equipped with advanced air conditioning and energy-efficient utilities, our gym is a testament to sustainable development without compromising on quality.
              </p>

              <h2>Perfect for Every Activity</h2>
              <p>
                Whether you're hosting a competitive sports event, conducting a fitness class, or organizing recreational activities for all ages, our gym provides the flexibility and functionality needed to make your event a success. The convenient half-court divider allows for simultaneous activities, catering to different groups or teams and enhancing the versatility of the space.
              </p>

              <div className="wpo-destination-single-sub-img">
                <ul>
                  <li><Image src={dimg1} alt="Sub Image 1" /></li>
                  <li><Image src={dimg2} alt="Sub Image 2" /></li>
                </ul>
              </div>
            </div>
          </div>

          <h2>Why Choose Our Gym?</h2>
          <ul>
            <li><strong>Modern Amenities:</strong> Benefit from high-quality equipment and smart, eco-friendly facilities.</li>
            <li><strong>Spacious Layout:</strong> Roomy enough for large groups yet adaptable for smaller gatherings.</li>
            <li><strong>Temperature Controlled:</strong> Stay cool and comfortable during your activity, thanks to our top-notch air conditioning system.</li>
            <li><strong>Multi-Use Capability:</strong> From basketball games to yoga sessions, our gym is tailored for various sports and fitness programs.</li>
          </ul>

          <h2>Host Your Next Event</h2>
          <p>
            Book your time in our gym and transform your sports, fitness, or recreational event into a memorable experience. Whether it’s a community basketball game, a training session, or an after-school sports event, we have the space and facilities you need to make it happen.
          </p>

          <Benefits />
        </div>
      </div>
      <DestinationSidebar />
    </div>
  </div>
</section>

            <Footer />
            <Scrollbar />
        </Fragment>
    )
};


export default DestinationSinglePage;
