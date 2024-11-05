import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';



const Benefits = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <div className="wpo-benefits-section">
            <h2>FAQ</h2>
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="wpo-benefits-item">
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={""}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography>What types of events can be held in the gymnasium?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                Our gymnasium is suitable for a variety of events, including basketball games, fitness classes, sports tournaments, yoga sessions, recreational activities, and community gatherings. Its versatile design accommodates both casual and competitive activities.                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={""}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography>How do I book the gymnasium?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                Booking the gymnasium is easy! Simply click on the “Book Your Space Now” button, and you'll be directed to our reservation portal. If you need assistance, reach out to our team via the contact form or call us directly.                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={""}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                            >
                                <Typography>What amenities are included with the gym rental?.</Typography>
                
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                The gym features state-of-the-art air conditioning, eco-friendly utilities, and a half-court divider for multi-use events. Additional amenities include ample space for various activities and temperature control for comfort.                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={""}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography>Can the gym be rented for private events or parties?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                Yes, our gym can be reserved for private events, including sports-themed birthday parties, team-building activities, or special group workouts.                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                            <AccordionSummary
                                expandIcon={""}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography>Are there any specific rules or guidelines for using the gym?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                To maintain a safe and enjoyable environment, we have a set of usage guidelines, including respecting the equipment, adhering to safety protocols, and cleaning up after your event. Full details will be provided upon booking.          </Typography>                  </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                            <AccordionSummary
                                expandIcon={""}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography>What is the cancellation policy for gym reservations?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                Our cancellation policy allows for adjustments or cancellations within a specified period prior to the event. Please refer to our booking terms for detailed information or contact us for clarity.                   
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                            <AccordionSummary
                                expandIcon={""}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                            >
                                <Typography>Are additional facilities available for use during the gym rental?</Typography>
                
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                Yes, depending on availability, additional amenities such as changing rooms and restrooms may be included. For full details on what’s included with your booking, please contact us.      
                                </Typography>
                        </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                            <AccordionSummary
                                expandIcon={""}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography>How far in advance should I book the gym?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                To ensure your preferred date is available, we recommend booking as early as possible, especially for weekends and popular time slots.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Benefits;