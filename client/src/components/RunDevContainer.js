import React, { useState } from "react";
import NavTabs from "./NavTabs";
import Footer from "./Footer/Index";
import Layout from "./Pages/Layout";
import MyProfile from "./Pages/MyProfile";
import LogIn from "./Pages/LogIn";
import Scripts from "./Pages/Scripts";

export default function RunDevContainer() {
  return (
    <div>
      <Layout></Layout>
    </div>
  );
}
