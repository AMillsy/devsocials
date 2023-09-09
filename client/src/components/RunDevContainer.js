import React, { useState } from "react";
import NavTabs from './NavTabs';
import Footer from './Footer';
// import Header from './Header';
import MyProfile from './Pages/MyProfile';
import LogIn from './Pages/LogIn';
import Scripts from './Pages/Scripts'

export default function RunDevContainer() {
    const [currentPage, setCurrentPage] = useState('MyProfile');

    const renderPage = () => {
        if (currentPage === 'MyProfile') {
            return <MyProfile />;
        }
        if (currentPage === 'logIn' ) {
            return <LogIn />;
        }
        if (currentPage === 'Scripts') {
            return <Scripts />;
        }
    }

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
            {renderPage()}
            <Footer />
        </div>
    )
}
