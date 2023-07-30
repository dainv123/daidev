import React from 'react'

function Contact () {
  return (
    <section id="contact" className="sub-page">
                            <div className="sub-page-inner">
                                <div className="section-title">
                                    <div className="main-title">
                                        <div className="title-main-page">
                                            <h4>Contact</h4>
                                            <p>NEED SOME HELP?</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Contact Form -->*/}
                                <div className="row contact-form pb-30">
                                    <div className="col-sm-12 col-md-5 col-lg-5 left-background">
                                        <img src="images/mailbox.png" alt="image"/>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-7">
                                        <div className="form-contact-me">
                                            <div id="show_contact_msg"></div>
                                            <form method="post" id="contact-form" action="/contact">
                                                <input name="name" id="name" type="text" placeholder="Name:" required autocomplete="off" />
                                                <input name="email" id="email" type="email" placeholder="Email:" required autocomplete="off" />
                                                <textarea name="comment" id="comment" placeholder="Message:" required rows="6"></textarea>
                                                <input className="bt-submit" type="submit" value="Send Message" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /Contact Form -->*/}

                                {/* <!-- Contact Details -->*/}
                                <div className="pt-50 pb-30">
                                    <div className="section-head">
                                        <h4>
                                            <span>Contact Information</span>
                                            Find me here
                                        </h4>
                                    </div>

                                    {/* <!-- Contact Info -->*/}
                                    <div className="sidebar-textbox row pb-50">
                                        <div className="contact-info d-flex col-md-4">
                                            <div className="w-25">
                                                <div className="contact-icon">
                                                    <i className="fas fa-phone"></i>
                                                </div>
                                            </div>
                                            <div className="contact-text w-75">
                                                <h2>Phone</h2>
                                                <p>(+84) 343 989 364</p>
                                            </div>
                                        </div>
                                        <div className="contact-info d-flex col-md-4">
                                            <div className="w-25">
                                                <div className="contact-icon">
                                                    <i className="fas fa-envelope-open"></i>
                                                </div>
                                            </div>
                                            <div className="contact-text w-75">
                                                <h2>Email</h2>
                                                <p>ngdai0402@gmail.com</p>
                                                <p>dainv0402@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="contact-info d-flex col-md-4">
                                            <div className="w-25">
                                                <div className="contact-icon">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </div>
                                            </div>
                                            <div className="contact-text w-75">
                                                <h2>Address</h2>
                                                <p>Thao Dien Ward, District 2, Ho Chi Minh City</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- /Contact info -->*/}

                                    {/* <!-- Map Container -->*/}
                                    <div className="contact-map pt-50">
                                        {/* <!-- GOOGLE MAP -->*/}
                                        <div id="google-map"></div>
                                    </div>
                                    {/* <!-- /Map Container -->*/}

                                    {/* <!-- Social Media -->*/}
                                    <div className="pt-50">
                                        <div className="social-media-block">
                                            <h4>Follow Me: </h4>
                                            <ul className="social-media-links">
                                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                                <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                                                <li><a href="#"><i className="fab fa-behance"></i></a></li>
                                                <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                                                <li><a href="#"><i className="fab fa-snapchat-ghost"></i></a></li>
                                                <li><a href="#"><i className="fab fa-vimeo-v"></i></a></li>
                                                <li><a href="#"><i className="fab fa-pinterest-p"></i></a></li>
                                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <!-- /Social Media -->*/}
                                </div>
                                {/* <!-- /Contact Details -->*/}
                            </div>
                        </section>
  )
}


export const SectionContact = Contact;