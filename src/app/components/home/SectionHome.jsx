import React from 'react'

function Home () {
  return (
    <section id="home" class="sub-page start-page">
      <div class="sub-page-inner">
          <div class="mask"></div>
          <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12">
                  <div class="title-block">
                      <h2>Hello, I'm Dai Nguyen</h2>
                      <div class="type-wrap">
                          <div class="typed-strings">
                              <span>Senior Web Developer</span>
                              <span>Newbie Mobile Developer</span>
                              <span>and</span>
                              <span>Culi in Some Backend Languages</span>
                          </div>
                          <span class="typed"></span>
                      </div>
                      <div class="home-buttons">
                          <a href="#contact" class="bt-submit"><i class="lnr lnr-envelope"></i> Contact Me</a>
                          <a href="#contact" class="bt-submit"><i class="lnr lnr-briefcase"></i> Hire Me</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
  )
}


export const SectionHome = Home;