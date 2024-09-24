import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/bookings/").then((res) => {
      setBookings(res.data);
    }).catch ((err) => {
      alert("Something went wrong");
    })
  },[])

  //useEffect can be used to fetch the booking details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  //in case of failure to fetch data the .catch block should generate a message stating "Something went Wrong"

  const handleAction = (id) => {
    // Delete the booking from the database by placing HTTP delete request to the
    // url - http://localhost:4000/bookings/<plan ID>
    // If the Axios call is successful, generate an alert "The booking for Booking ID :" <id > " is deleted" and navigate to home page
    // If the Axios call fails, generate alert "Something went wrong".
    //id.preventDefault();
    axios.delete("http://localhost:4000/bookings/"+ id).then((res)=> {
      alert("The booking for Booking ID :" +res.data.id +" is deleted");
  }).catch((err)=>{
  alert("Something went wrong")
  })
    
  };

  return (
    <div style={{ backgroundColor: "white", opacity: "0.95", marginTop: "50px" }}>
      {/* display individual bookings in Cards and apply some inline styling */
      bookings.map((details) => {
        return (
          <div style={{ padding: "10px", borderRadius: "10px" }}key={details.id}>
             <h4>Booking id:{details.id}</h4>
             <p>Bouquet Name :{details.bouquetName}</p>
             <p>Email Id : {details.emailId}</p>
             <p>No of Bouquet :{details.flowerCount}</p>
             <p>Booking Date :{details.bookedOn}</p>
        <button className="btn btn-danger mt-2 ms-2" data-testid="delete-button"
           onClick= { () => {handleAction(details.id);}}>
               Delete
        </button>
        </div>
        );
      })}
      {/* generate necessary code to call the function to handle delete opration of the user */}
    </div>
  );
}

export default AllBookings;

