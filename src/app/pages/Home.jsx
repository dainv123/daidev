import React, { useEffect } from 'react'
import useScript from '../hooks/useScript'
import useStyle from '../hooks/useStyle'
import { connect } from 'react-redux'
import { SectionPreloader } from '../components/home/SectionPreloader'
import * as mutations from '../store/mutations'
import { SectionHeader } from '../components/home/SectionHeader'
import { SectionResponsiveHeader } from '../components/home/SectionResponsiveHeader'
import { SectionHome } from '../components/home/SectionHome'
import { SectionAboutMe } from '../components/home/SectionAboutMe'
import { SectionResume } from '../components/home/SectionResume'
import { SectionPortfolio } from '../components/home/SectionPortfolio'
import { SectionBlog } from '../components/home/SectionBlog'
import { SectionContact } from '../components/home/SectionContact'

function Home ({ groups, test }) {
    useEffect(() => { test() }, []);
    useStyle('/assets/css/bootstrap.min.css');
    useStyle('/assets/css/animate.min.css');
    useStyle('/assets/css/owl.carousel.min.css');
    useStyle('/assets/css/lightcase.min.css');
    useStyle('/assets/css/style.css');
    useScript('/assets/js/jquery.min.js');
    useScript('/assets/js/bootstrap.min.js');
    useScript('/assets/js/owl.carousel.min.js');
    useScript('/assets/js/typed.min.js');
    useScript('/assets/js/lightcase.min.js');
    useScript('/assets/js/jquery.isotope.min.js');
    useScript('/assets/js/wow.min.js');
    useScript('https://maps.google.com/maps/api/js?key=AIzaSyBkdsK7PWcojsO-o_q2tmFOLBfPGL8k8Vg&amp;language=en');
    useScript('/assets/js/script.js');


    return (
        <div className="home">
            <SectionPreloader></SectionPreloader>
            <div className="wrapper-page">
                <SectionHeader />

                <SectionResponsiveHeader />

                <div className="content-pages">
                    <div className="sub-home-pages">
                        <SectionHome />

                        <SectionAboutMe />

                        <SectionResume />

                        <SectionPortfolio />

                        <SectionBlog />

                        <SectionContact />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({groups})=>({groups});

const mapDispatchToProps = dispatch => ({
    test() {
        dispatch(mutations.test())
    }
})

export const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
