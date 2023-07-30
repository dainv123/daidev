import React from 'react'

function AboutMe () {
  return (
    <section id="about-me" className="sub-page">
      <div className="sub-page-inner">
          <div className="section-title">
              <div className="main-title">
                  <div className="title-main-page">
                      <h4>About me</h4>
                      <p>WHAT DO YOU WANT TO KNOW ABOUT ME?</p>
                  </div>
              </div>
          </div>
          <div className="section-content">
              {/* <!-- about me -->*/}
              <div className="row pb-30">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <h3>Dai Nguyen</h3>
                      <span className="about-location"><i className="lnr lnr-map-marker"></i>Ho Chi Minh City, Viet Nam</span>
                      <p className="about-content">
                          My name is Nguyen Van Dai I'm a 26 year old Front End Engineer based in Ho Chi Minh city ☀️. I describe myself as a passionate developer who loves coding, open source, and the web platform ❤️.
                      </p>
                      <p className="about-content">
                          Aside from my job, I like to create and contribute to open source projects. That helps me to learn a ton of new stuff, grow as a developer and support other open source projects. Also I enjoy writing technical things ✍️ at <a href="#blog">my blog</a>.
                      </p>
                      <p className="about-content">
                          In my free time you can find me backpacking, at the mountain/beach 🏖 or on tech fair around Ho Chi Minh city.
                      </p>
                      <ul className="bout-list-summry row">
                          <li className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                              <div className="icon-info">
                                  <i className="lnr lnr-briefcase"></i>
                              </div>
                              <div className="details-info">
                                  <h6>3 Years+ Job</h6>
                                  <p>Experience</p>
                              </div>
                          </li>
                          <li className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                              <div className="icon-info">
                                  <i className="lnr lnr-layers"></i>
                              </div>
                              <div className="details-info">
                                  <h6><a href="https://www.codingame.com/clashofcode">Codingame</a> clash of code</h6>
                                  <p>Reached the top 50 in Vietnam</p>
                              </div>
                          </li>
                          {/* <!-- <li className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                              <div className="icon-info">
                                  <i className="lnr lnr-coffee-cup"></i>
                              </div>
                              <div className="details-info">
                                  <h6>150+ Meetings</h6>
                                  <p>Successful</p>
                              </div>
                          </li> -->*/}
                      </ul>
                  </div>

                  <div className="col-xs-6 col-sm-12 col-md-6 col-lg-6">
                      <div className="box-img">
                          <img src="images/about.png" className="img-fluid" alt="image"/>
                      </div>
                  </div>
              </div>
              {/* <!-- /about me -->*/}

              {/* <!-- services -->*/}
              <div className="special-block-bg">
                  <div className="section-head">
                      <h4>
                          <span>What Actually I Do</span>
                          My Services
                      </h4>
                  </div>
                  <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div className="services-list">
                              {/* <!-- Service Item 1 -->*/}
                              <div className="service-block">
                                  <div className="service-icon">
                                      <i className="lnr lnr-code"></i>
                                  </div>
                                  <div className="service-text">
                                      <h4>Frontend Development</h4>
                                      <p>JavaScript, TypeScript, JS frameworks, such as: Vue.js, React.js, Angular, JQuery, Express.js ...</p>
                                  </div>
                              </div>
                              {/* <!-- /Service Item 1 -->*/}

                              {/* <!-- Service Item 2 -->*/}
                              <div className="service-block">
                                  <div className="service-icon">
                                      <i className="lnr lnr-laptop-phone"></i>
                                  </div>
                                  <div className="service-text">
                                      <h4>Mobile Development</h4>
                                      <p>React Native, Native Script</p>
                                  </div>
                              </div>
                              {/* <!-- Service Item 2 -->*/}
                          </div>
                      </div>

                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div className="services-list">
                              {/* <!-- Service Item 3 -->*/}
                              <div className="service-block">
                                  <div className="service-icon">
                                      <i className="lnr lnr-database"></i>
                                  </div>
                                  <div className="service-text">
                                      <h4>Backend Development</h4>
                                      <p>Node.js, WordPress, Laravel</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              {/* <!-- /services -->*/}

              {/* <!-- Video section -->*/}
              <div className="video-section">
                  <div className="overlay pb-40 pt-40">
                      <div className="container">
                          <div className="row">
                              <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                                  <div className="sub-title">
                                      <h6>Why You Hire Me?</h6>
                                      <h2>I Am The Best Front End Expert in the creative land</h2>
                                  </div>
                              </div>
                              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                                  <div className="pulse-icon">
                                      <div className="icon-wrap">
                                          <a href="https://www.youtube.com/channel/UCeHYdT245RL4C57uDjhx0kw?view_as=subscriber">
                                              <i className="fa fa-play"></i>
                                          </a>
                                      </div>
                                      <div className="elements">
                                          <div className="circle circle-outer"></div>
                                          <div className="circle circle-inner"></div>
                                          <div className="pulse pulse-1"></div>
                                          <div className="pulse pulse-2"></div>
                                          <div className="pulse pulse-3"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              {/* <!-- /Video section -->*/}
          </div>
      </div>
  </section>
  )
}


export const SectionAboutMe = AboutMe;