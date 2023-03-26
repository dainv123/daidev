import React from 'react'

function Portfolio () {
  return (
    <section id="portfolio" class="sub-page">
                            <div class="sub-page-inner">
                                <div class="section-title">
                                    <div class="main-title">
                                        <div class="title-main-page">
                                            <h4>Portfolio</h4>
                                            <p>Samples of some of my work from the past year.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="section-content">
                                    <div class="filter-tabs">
                                        <button class="fil-cat" data-rel="all"><span>0</span> All</button>
                                        <button class="fil-cat" data-rel="website"><span>08</span> Websites</button>
                                        <button class="fil-cat" data-rel="mobile"><span>03</span> Mobiles</button>
                                    </div>

                                    <div class="portfolio-grid portfolio-trigger" id="portfolio-page">
                                        <div class="label-portfolio"><span class="rotated-sub">project</span><span class="project-count">9</span></div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 portfolio-item website all">
                                                <div class="portfolio-img">
                                                    <img src="images/portfolio/portfolio-img-1.jpeg" class="img-responsive" alt=""/>
                                                </div>
                                                <div class="portfolio-data">
                                                    <h4><a href="https://chugai-pharm.jp/auth/">Chugai Pharm</a></h4>
                                                    <p class="meta">JQuery, Pug, SASS</p>
                                                    <div class="portfolio-attr">
                                                        <a href="https://chugai-pharm.jp/auth/"><i class="lnr lnr-link"></i></a>
                                                        <a href="images/portfolio/portfolio-img-1.jpeg" data-rel="lightcase:gal" title="Image Caption"><i class="lnr lnr-move"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 portfolio-item website mobile all">
                                                <div class="portfolio-img"><img src="images/portfolio/portfolio-img-2.jpeg" class="img-responsive" alt=""/></div>
                                                <div class="portfolio-data">
                                                    <h4><a href="https://adstudio.blueseed.tv/">Ad Studio</a></h4>
                                                    <p class="meta">Laravel, JQuery</p>
                                                    <div class="portfolio-attr">
                                                        <a href="https://adstudio.blueseed.tv/"><i class="lnr lnr-link"></i></a>
                                                        <a href="images/portfolio/portfolio-img-2.jpeg" data-rel="lightcase:gal" title="Image Caption"><i class="lnr lnr-move"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 portfolio-item website all">
                                                <div class="portfolio-img"><img src="images/portfolio/portfolio-img-3.jpeg" class="img-responsive" alt=""/></div>
                                                <div class="portfolio-data">
                                                    <h4><a href="https://www.globe.com.ph/#gref">Globe One</a></h4>
                                                    <p class="meta">Vue.js, SASS</p>
                                                    <div class="portfolio-attr">
                                                        <a href="https://www.globe.com.ph/#gref"><i class="lnr lnr-link"></i></a>
                                                        <a href="images/portfolio/portfolio-img-3.jpeg" data-rel="lightcase:gal" title="Image Caption"><i class="lnr lnr-move"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 portfolio-item website all">
                                                <div class="portfolio-img"><img src="images/portfolio/portfolio-img-8.jpeg" class="img-responsive" alt=""/></div>
                                                <div class="portfolio-data">
                                                    <h4><a>Globe One Webtool</a></h4>
                                                    <p class="meta">Vue.js, SASS</p>
                                                    <div class="portfolio-attr">
                                                        {/* <!-- <a href="portfolio-single.html"><i class="lnr lnr-link"></i></a> -->*/}
                                                        <a href="images/portfolio/portfolio-img-8.jpeg" data-rel="lightcase:gal" title="Image Caption"><i class="lnr lnr-move"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 portfolio-item mobile all">
                                                <div class="portfolio-img"><img src="images/portfolio/portfolio-img-4.jpeg" class="img-responsive" alt=""/></div>
                                                <div class="portfolio-data">
                                                    <h4><a href="https://apps.apple.com/us/app/id1459216958">Globe One</a></h4>
                                                    <p class="meta">Native Script (Angular)</p>
                                                    <div class="portfolio-attr">
                                                        <a href="https://apps.apple.com/us/app/id1459216958"><i class="lnr lnr-link"></i></a>
                                                        <a href="images/portfolio/portfolio-img-4.jpeg" data-rel="lightcase:gal" title="Image Caption"><i class="lnr lnr-move"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 portfolio-item website all">
                                                <div class="portfolio-img"><img src="images/portfolio/portfolio-img-5.jpeg" class="img-responsive" alt=""/></div>
                                                <div class="portfolio-data">
                                                    <h4><a href="https://www.facebook.com/skyhelmtech/">SkyHelm (Updated)</a></h4>
                                                    <p class="meta">Template, CMS</p>
                                                    <div class="portfolio-attr">
                                                        <a href="https://www.facebook.com/skyhelmtech/"><i class="lnr lnr-link"></i></a>
                                                        <a href="images/portfolio/portfolio-img-5.jpeg" data-rel="lightcase:gal" title="Image Caption"><i class="lnr lnr-move"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 portfolio-item website all">
                                                <div class="portfolio-img"><img src="images/portfolio/portfolio-img-6.jpeg" class="img-responsive" alt=""/></div>
                                                <div class="portfolio-data">
                                                    <h4><a href="https://www.facebook.com/therelever/">Relever (Died)</a></h4>
                                                    <p class="meta">WordPress</p>
                                                    <div class="portfolio-attr">
                                                        <a href="https://www.facebook.com/therelever/"><i class="lnr lnr-link"></i></a>
                                                        <a href="images/portfolio/portfolio-img-6.jpeg" data-rel="lightcase:gal" title="Image Caption"><i class="lnr lnr-move"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 portfolio-item website mobile all">
                                                <div class="portfolio-img"><img src="images/portfolio/portfolio-img-7.jpeg" class="img-responsive" alt=""/></div>
                                                <div class="portfolio-data">
                                                    <h4><a href="https://adstudio.blueseed.tv/ads/instream-video">BS Player</a></h4>
                                                    <p class="meta">JavaScript</p>
                                                    <div class="portfolio-attr">
                                                        <a href="https://adstudio.blueseed.tv/ads/instream-video"><i class="lnr lnr-link"></i></a>
                                                        <a href="images/portfolio/portfolio-img-7.jpeg" data-rel="lightcase:gal" title="Image Caption"><i class="lnr lnr-move"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 portfolio-item website all">
                                                <div class="portfolio-img"><img src="images/portfolio/portfolio-img-8.jpeg" class="img-responsive" alt=""/></div>
                                                <div class="portfolio-data">
                                                    <h4><a>Globe OC3 Webtool</a></h4>
                                                    <p class="meta">Vue.JS, SASS</p>
                                                    <div class="portfolio-attr">
                                                        {/* <!-- <a href="portfolio-single.html"><i class="lnr lnr-link"></i></a> -->*/}
                                                        <a href="images/portfolio/portfolio-img-8.jpeg" data-rel="lightcase:gal" title="Image Caption"><i class="lnr lnr-move"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
  )
}


export const SectionPortfolio = Portfolio;