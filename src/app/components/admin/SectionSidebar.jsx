import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            <Link to="/admin" className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-fw fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Admin</div>
            </Link>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item active">
                <Link to="/admin" className="nav-link">
                    <i className="fas fa-fw fa-home"></i>
                    <span>Dashboard</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

            <li className="nav-item">
                <Link to="/admin/about-me" className="nav-link">
                    <i className="fas fa-fw fa-user-tie"></i>
                    <span>About Me</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/portfolio" className="nav-link">
                    <i className="fas fa-fw fa-business-time"></i>
                    <span>Portfolio</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/blog" className="nav-link">
                    <i className="fas fa-fw fa-book-reader"></i>
                    <span>Blog</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/resume" className="nav-link">
                    <i className="fas fa-fw fa-award"></i>
                    <span>Resume</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/contact" className="nav-link">
                    <i className="fas fa-fw fa-paper-plane"></i>
                    <span>Contact</span>
                </Link>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        </ul>
    );
}

export const SectionSidebar = Sidebar;
