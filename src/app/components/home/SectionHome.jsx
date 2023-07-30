import React from 'react'

function Home () {
  return (
    <section id="home" className="sub-page start-page">
      <div className="sub-page-inner">
          <div className="mask"></div>
          <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="title-block">
                      <h2>Hello, I'm Dai Nguyen</h2>
                      <div className="type-wrap">
                          <div className="typed-strings">
                              <span>Senior Web Developer</span>
                              <span>Newbie Mobile Developer</span>
                              <span>and</span>
                              <span>Culi in Some Backend Languages</span>
                          </div>
                          <span className="typed"></span>
                      </div>
                      <div className="home-buttons">
                          <a href="#contact" className="bt-submit"><i className="lnr lnr-envelope"></i> Contact Me</a>
                          <a href="#contact" className="bt-submit"><i className="lnr lnr-briefcase"></i> Hire Me</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
  )
}


export const SectionHome = Home;