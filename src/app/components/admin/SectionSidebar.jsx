import React from 'react'

function Sidebar () {
  return (
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Admin</div>
        </a>

        <hr class="sidebar-divider my-0"/>

        <li class="nav-item active">
            <a class="nav-link" href="index.html">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
        </li>

        <hr class="sidebar-divider"/>

        <li class="nav-item">
            <a class="nav-link" href="tables.html">
            <i class="fas fa-fw fa-table"></i>
            <span>Profile</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="tables.html">
            <i class="fas fa-fw fa-table"></i>
            <span>Portfolio</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="tables.html">
            <i class="fas fa-fw fa-table"></i>
            <span>Blog</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="tables.html">
            <i class="fas fa-fw fa-table"></i>
            <span>Resume</span></a>
        </li>

        <hr class="sidebar-divider d-none d-md-block"/>

        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
    </ul>
  )
}


export const SectionSidebar = Sidebar;