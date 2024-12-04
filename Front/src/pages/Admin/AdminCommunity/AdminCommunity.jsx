import React from "react";
import '../AdminCommunity/AdminCommunity.css';
import Header from "../../../components/Header";
import AdminCommunityItem from "./AdminCommunityItem";

function AdminCommunity() {
    return (
        <div>
            <div className="AdminCommunityContainer">
                <Header />
                <div className="adminCommunityGridContent">
                    <div className="adminCommunityGrid">
                        <AdminCommunityItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCommunity;