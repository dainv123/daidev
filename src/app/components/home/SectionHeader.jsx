import React from 'react'

function Header () {
  return (
    <div className="header">
      <div className="header-content">
          <div className="profile-picture-block">
              <div className="my-photo">
                  <img src="images/avatar.jpg" className="img-fluid" alt="image" />
              </div>
          </div>
          {/* <!-- Header Head -->*/}
          <div className="site-title-block">
              <div className="site-title">Dai Nguyen</div>
              <div className="type-wrap">
                  <div className="typed-strings">
                      <span>Senior Web Developer</span>
                      <span>Newbie Mobile Developer</span>
                      <span>and</span>
                      <span>Culi in Some Backend Languages</span>
                  </div>
                  <span className="typed"></span>
              </div>
          </div>
          {/* <!-- /Header Head -->*/}

          {/* <!-- Navigation -->*/}
          <div className="site-nav">
              {/* <!-- Main menu -->*/}
              <ul className="header-main-menu" id="header-main-menu">
                  <li><a className="active" href="#home"><i className="fas fa-home"></i> Home</a></li>
                  <li><a href="#about-me"><i className="fas fa-user-tie"></i> About Me</a></li>
                  <li><a href="#resume"><i className="fas fa-award"></i> Resume</a></li>
                  <li><a href="#portfolio"><i className="fas fa-business-time"></i> Portfolio</a></li>
                  <li><a href="#blog"><i className="fas fa-book-reader"></i> Blog</a></li>
                  <li><a href="#contact"><i className="fas fa-paper-plane"></i> Contact</a></li>
              </ul>
              {/* <!-- /Main menu -->*/}
              {/* <!-- Copyrights -->*/}
              <div className="copyrights">© 2020 All rights reserved.</div>
              {/* <!-- / Copyrights -->*/}
          </div>
          {/* <!-- /Navigation -->*/}
      </div>
  </div>
  )
}


export const SectionHeader = Header;