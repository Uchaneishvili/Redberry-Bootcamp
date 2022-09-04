import React from "react";
import "./List.css";
import arrow from "./Vector.svg";
import webArrow from "./web-arrow.svg";
import isDeleted from "./Rectangle_4.png";

function List() {
  return (
    <div className="parent-container">
      <div className="list-tab-container ">
        <div className="arrow-vector-container">
          <img
            src={arrow}
            className="mobile-back-arrow"
            alt="back"
            onClick={() => window.history.back()}
          />
          <img
            src={webArrow}
            className="web-back-arrow"
            alt="back"
            onClick={() => window.history.back()}
          />
        </div>
        <div className="tab-title">
          <h5 className="bold-title">ჩანაწერების სია</h5>
        </div>
        <div />
      </div>

      <div className="parent-inner-container">
        <div className="card-container">
          <div className="card-inner-container">
            <div className="card-image-container">
              <img src={isDeleted} alt="card" className="card-image" />
            </div>
            <div style={{ width: "3%" }} />
            <div className="card-info-container">
              <div className="laptop-info">
                <div className="name-info-container">
                  <p className="name-info">ირინე ჩანქსელიანი</p>
                </div>
                <div className="cpu-info-container">
                  <p className="cpu-info">Pentium III</p>
                </div>
              </div>

              <div className="see-more">
                <p>მეტის ნახვა</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container">
          <div className="card-inner-container">
            <div className="card-image-container">
              <img src={isDeleted} alt="card" className="card-image" />
            </div>
            <div style={{ width: "3%" }} />
            <div className="card-info-container">
              <div className="laptop-info">
                <div className="name-info-container">
                  <p className="name-info">ირინე ჩანქსელიანი</p>
                </div>
                <div className="cpu-info-container">
                  <p className="cpu-info">Pentium III</p>
                </div>
              </div>

              <div className="see-more">
                <p>მეტის ნახვა</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
