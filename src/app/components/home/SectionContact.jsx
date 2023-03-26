import React from 'react'

function Contact () {
  return (
    <section id="contact" class="sub-page">
                            <div class="sub-page-inner">
                                <div class="section-title">
                                    <div class="main-title">
                                        <div class="title-main-page">
                                            <h4>Contact</h4>
                                            <p>NEED SOME HELP?</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Contact Form -->*/}
                                <div class="row contact-form pb-30">
                                    <div class="col-sm-12 col-md-5 col-lg-5 left-background">
                                        <img src="images/mailbox.png" alt="image"/>
                                    </div>
                                    <div class="col-sm-12 col-md-7 col-lg-7">
                                        <div class="form-contact-me">
                                            <div id="show_contact_msg"></div>
                                            <form method="post" id="contact-form" action="/contact">
                                                <input name="name" id="name" type="text" placeholder="Name:" required autocomplete="off" />
                                                <input name="email" id="email" type="email" placeholder="Email:" required autocomplete="off" />
                                                <textarea name="comment" id="comment" placeholder="Message:" required rows="6"></textarea>
                                                <input class="bt-submit" type="submit" value="Send Message" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /Contact Form -->*/}

                                {/* <!-- Contact Details -->*/}
                                <div class="pt-50 pb-30">
                                    <div class="section-head">
                                        <h4>
                                            <span>Contact Information</span>
                                            Find me here
                                        </h4>
                                    </div>

                                    {/* <!-- Contact Info -->*/}
                                    <div class="sidebar-textbox row pb-50">
                                        <div class="contact-info d-flex col-md-4">
                                            <div class="w-25">
                                                <div class="contact-icon">
                                                    <i class="fas fa-phone"></i>
                                                </div>
                                            </div>
                                            <div class="contact-text w-75">
                                                <h2>Phone</h2>
                                                <p>(+84) 343 989 364</p>
                                            </div>
                                        </div>
                                        <div class="contact-info d-flex col-md-4">
                                            <div class="w-25">
                                                <div class="contact-icon">
                                                    <i class="fas fa-envelope-open"></i>
                                                </div>
                                            </div>
                                            <div class="contact-text w-75">
                                                <h2>Email</h2>
                                                <p>ngdai0402@gmail.com</p>
                                                <p>dainv0402@gmail.com</p>
                                            </div>
                                        </div>
                                        <div class="contact-info d-flex col-md-4">
                                            <div class="w-25">
                                                <div class="contact-icon">
                                                    <i class="fas fa-map-marker-alt"></i>
                                                </div>
                                            </div>
                                            <div class="contact-text w-75">
                                                <h2>Address</h2>
                                                <p>Thao Dien Ward, District 2, Ho Chi Minh City</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- /Contact info -->*/}

                                    {/* <!-- Map Container -->*/}
                                    <div class="contact-map pt-50">
                                        {/* <!-- GOOGLE MAP -->*/}
                                        <div id="google-map"></div>
                                    </div>
                                    {/* <!-- /Map Container -->*/}

                                    {/* <!-- Social Media -->*/}
                                    <div class="pt-50">
                                        <div class="social-media-block">
                                            <h4>Follow Me: </h4>
                                            <ul class="social-media-links">
                                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                                <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                                <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                                                <li><a href="#"><i class="fab fa-behance"></i></a></li>
                                                <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                                                <li><a href="#"><i class="fab fa-snapchat-ghost"></i></a></li>
                                                <li><a href="#"><i class="fab fa-vimeo-v"></i></a></li>
                                                <li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
                                                <li><a href="#"><i class="fab fa-instagram"></i></a></li>
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