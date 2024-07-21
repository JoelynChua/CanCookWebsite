import React from "react";
import '../styles/aboutUs.css';
import GrpPhoto from "../assets/grp.jpg";
import indiv_1 from "../assets/indiv_p1.jpg";
import indiv_2 from "../assets/indiv_p2.jpg";




const AboutUs = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-beige_main">
            <div className="title">
                Hello from Team 8!
            </div>
            <div className="card">
                <div className="column left">
                    <img src = {GrpPhoto} />
                </div>

                <div className="column right">
                    <div className="row">
                        <img src = {indiv_1} />
                    </div>

                    <div className="row">
                        <img src = {indiv_2} />
                    </div>
                </div>        
            </div>
        </div>
    );
};

export default AboutUs;