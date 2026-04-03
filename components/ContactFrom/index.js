import React, { Component } from 'react'


class ContactForm extends Component {


    state = {
        name: '',
        email: '',
        subject: '',
        lastname: '',
        message: '',
        error: {},
        successMessage: '',
        isSubmitting: false
    }


    changeHandler = (e) => {
        const error = this.state.error;
        error[e.target.name] = ''

        this.setState({
            [e.target.name]: e.target.value,
            error
        })
    }

    subimtHandler = async (e) => {
        e.preventDefault();

        const { name, email, subject, lastname, message } = this.state;
        const error = {};

        // Validation
        if (name === '') {
            error.name = "Please enter your name";
        }
        if (email === '') {
            error.email = "Please enter your email";
        }
        if (subject === '') {
            error.subject = "Please enter your subject";
        }
        if (lastname === '') {
            error.lastname = "Please enter your lastname";
        }
        if (message === '') {
            error.message = "Please enter your message";
        }

        // If there are errors, show them
        if (Object.keys(error).length > 0) {
            this.setState({ error });
            return;
        }

        // If validation passes, send email
        this.setState({ isSubmitting: true, successMessage: '', error: {} });

        try {
            const response = await fetch('https://hotel-website-backend-eosin.vercel.app/send_contact_form_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    lastname,
                    email,
                    subject,
                    message
                }),
            });

            const data = await response.json();

            if (response.ok) {
                this.setState({
                    name: '',
                    email: '',
                    subject: '',
                    lastname: '',
                    message: '',
                    error: {},
                    successMessage: 'Email sent successfully! We will get back to you soon.',
                    isSubmitting: false
                });

                // Clear success message after 5 seconds
                setTimeout(() => {
                    this.setState({ successMessage: '' });
                }, 5000);
            } else {
                this.setState({
                    error: { submit: data.error || 'Failed to send email. Please try again.' },
                    isSubmitting: false
                });
            }
        } catch (err) {
            this.setState({
                error: { submit: 'An error occurred. Please try again later.' },
                isSubmitting: false
            });
        }
    }

    render(){
        const { name, email, subject, lastname, message, error, successMessage, isSubmitting } = this.state;

        return(
            <form onSubmit={this.subimtHandler} className="contact-form">
                {/* Success Message */}
                {successMessage && (
                    <div style={{
                        padding: '15px',
                        marginBottom: '20px',
                        backgroundColor: '#d4edda',
                        border: '1px solid #c3e6cb',
                        borderRadius: '4px',
                        color: '#155724',
                        fontSize: '14px',
                        fontWeight: '600',
                        textAlign: 'center'
                    }}>
                        ✓ {successMessage}
                    </div>
                )}

                {/* Error Message */}
                {error.submit && (
                    <div style={{
                        padding: '15px',
                        marginBottom: '20px',
                        backgroundColor: '#f8d7da',
                        border: '1px solid #f5c6cb',
                        borderRadius: '4px',
                        color: '#721c24',
                        fontSize: '14px',
                        fontWeight: '600',
                        textAlign: 'center'
                    }}>
                        ✗ {error.submit}
                    </div>
                )}

                <div className="row">
                    <div className="col-lg-6 col-12">
                        <div className="form-field">
                            <input value={name} onChange={this.changeHandler} type="text" name="name" placeholder="First Name"/>
                            <p>{error.name ? error.name : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="form-field">
                            <input value={lastname} onChange={this.changeHandler} type="text" name="lastname" placeholder="Lastname"/>
                            <p>{error.lastname ? error.lastname : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="form-field">
                            <input onChange={this.changeHandler} value={email} type="email" name="email" placeholder="Email"/>
                            <p>{error.email ? error.email : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="form-field">
                            <input onChange={this.changeHandler} value={subject} type="text" name="subject" placeholder="Subject"/>
                            <p>{error.subject ? error.subject : ''}</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-field">
                            <textarea
                                name="message"
                                value={message}
                                onChange={this.changeHandler}
                                placeholder="Message"
                            ></textarea>
                            <p>{error.message ? error.message : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-submit">
                            <button
                                type="submit"
                                className="theme-btn"
                                disabled={isSubmitting}
                                style={{
                                    opacity: isSubmitting ? 0.6 : 1,
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}
export default  ContactForm;