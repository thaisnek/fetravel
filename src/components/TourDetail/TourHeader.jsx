import React from "react";
import { FaStar, FaMapMarkerAlt} from 'react-icons/fa';

const TourHeader = ({ tour }) => {
  return (
    <section className="tour-header-area pt-70 rel z-1">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-xl-6 col-lg-7">
            <div class="tour-header-content mb-15">
                <span class="location d-inline-block mb-10"><FaMapMarkerAlt /> {tour.destination}</span>
                <div class="section-title pb-5">
                    <h2>Tour Hà Nội - Sapa</h2>
                </div>
                <div className="ratting filled">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
            </div>
          </div>
        </div>
        <hr className="mt-50 mb-70" />
      </div>
    </section>
  );
};

export default TourHeader;