import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <ul
            class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            <Link to="/admin" className="sidebar-brand d-flex align-items-center justify-content-center">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-fw fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">Admin</div>
            </Link>

            <hr class="sidebar-divider my-0" />

            <li class="nav-item active">
                <Link to="/admin" className="nav-link">
                    <i class="fas fa-fw fa-home"></i>
                    <span>Dashboard</span>
                </Link>
            </li>

            <hr class="sidebar-divider" />

            <li class="nav-item">
                <Link to="/admin/about-me" className="nav-link">
                    <i class="fas fa-fw fa-user-tie"></i>
                    <span>About Me</span>
                </Link>
            </li>

            <li class="nav-item">
                <Link to="/admin/portfolio" className="nav-link">
                    <i class="fas fa-fw fa-business-time"></i>
                    <span>Portfolio</span>
                </Link>
            </li>

            <li class="nav-item">
                <Link to="/admin/blog" className="nav-link">
                    <i class="fas fa-fw fa-book-reader"></i>
                    <span>Blog</span>
                </Link>
            </li>

            <li class="nav-item">
                <Link to="/admin/resume" className="nav-link">
                    <i class="fas fa-fw fa-award"></i>
                    <span>Resume</span>
                </Link>
            </li>

            <li class="nav-item">
                <Link to="/admin/contact" className="nav-link">
                    <i class="fas fa-fw fa-paper-plane"></i>
                    <span>Contact</span>
                </Link>
            </li>

            <hr class="sidebar-divider d-none d-md-block" />

            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        </ul>
    );
}

export const SectionSidebar = Sidebar;
