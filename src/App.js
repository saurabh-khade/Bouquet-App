import React, { Component } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateBooking from "./Component/CreateBooking";
import ViewBooking from "./Component/ViewBooking";
// import UpdateBooking from "./Component/UpdateBooking"
import AllBooking from "./Component/AllBooking"
// import Update from "tar/lib/update";
import UpdateBooking from "./Component/UpdateBooking";


/* 
  Implement the logic for loading the views 
*/
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav
          data-testid="navbar"
          className="navbar navbar-expand-lg navbar-light  bg-custom"
        >
          <span className="navbar-brand">BOUQUET OF LOVE</span>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" data-testid="bookBouquet-link" to="/">
                Book Bouquet
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                data-testid="viewBookings-link"
                to="/viewBookings"
              >
                View Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                data-testid="allBookings-link"
                to="/allBookings"
              >
                View All Bookings
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
         <Route path="/" element={<CreateBooking/>}/>
          <Route path="/viewBookings" element={<ViewBooking/>}/>
          <Route path="/allBookings" element={<AllBooking/>}/>
          {/*configure the Route's */}
          <Route path="/updateBooking/:id/" element={<UpdateBooking/>}/>

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
