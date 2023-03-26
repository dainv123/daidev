import React from 'react'

function ResponsiveHeader () {
  return (
    <div className="responsive-header">
        <div className="responsive-header-name">
            <img className="responsive-logo" src="images/avatar.jpg" alt="" />
            Dai Nguyen
        </div>
        <span className="responsive-icon"><i className="lnr lnr-menu"></i></span>
    </div>
  )
}


export const SectionResponsiveHeader = ResponsiveHeader;