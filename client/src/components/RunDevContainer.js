import React, { useState } from "react";
import NavTabs from "./NavTabs";
import Footer from "./Footer/Index";
import Layout from "./Pages/Layout";
import MyProfile from "./Pages/MyProfile";
import LogIn from "./Pages/LogIn";

import Scripts from "./Pages/Scripts";

export default function RunDevContainer() {
  const [currentPage, setCurrentPage] = useState("MyProfile");

  const renderPage = () => {
    if (currentPage === "MyProfile") {
      return <MyProfile />;
    }
    if (currentPage === "logIn") {
      return <LogIn />;
    }
    if (currentPage === "Scripts") {
      return <Scripts />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
     <Layout currentPage={currentPage} handlePageChange={handlePageChange}>
      {renderPage()}
    </Layout>
    </div>
  );
}
