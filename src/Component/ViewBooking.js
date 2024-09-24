import axios from "axios";
import React, { useState } from "react";
import  { useNavigate } from "react-router-dom"

let url = "http://localhost:4000/bookings/";

const ViewBooking = (props) => {
  const [state, setState] = useState({
    bookingId: "", // This will contain booking Id from input field
    bookingData: null, // This will contain booking data recieved from web service
    infoMessage: "",
  });
  //A collection of few messages that the component displays.
  // Wherever applicable, pls use the following json to display the messages instead of hardcoding the messages.
  const [messages] = useState({
    INFO: "The booking has been deleted! Please refresh the page.",
    ERRINFO: "Something Went Wrong",
  });
  const navi = useNavigate();


  const handleChange = (event) => {
    /*
    This method should update state of bookingId with the value entered by the user.
    */
      
      const {value, name} = event.target
      setState({...state,[name]:value})
      console.log(name,value)

  };
const handleAction = (action) => {
      
    /*
      This method will be invoked for following action values:
      1. onDelete: a) when a delete button clicks,  axios call to url 
                     "http://localhost:4000/bookings/"+<booking Id>
                   b) update infoMessage state as 'The booking has been deleted! Please refresh the page.' on successful delete operation, otherwise
                      set as "Reservation for booking id: " + <booking Id> + " is not found!"

     2.  isUpdate: a) When a update button is clicked, navigate to '/updateBooking/'+ <booking Id>

    
   */
        
      if(action =="Delete"){
        axios.delete("http://localhost:4000/bookings/"+ state.bookingId).then((res)=> {
               alert("The booking for Booking ID :" +res.data.id +" is deleted");
        }).catch((err)=>{
               alert("Something went wrong")
        })
      }
      else if(action=="View") {
        axios.get("http://localhost:4000/bookings/"+ state.bookingId).then((res) =>{
                  setState({...state, bookingData:res.data});
                 })

      }else if (action == "Update"){
        navi('/updateBooking/'+state.bookingId,{replace:true})

      }
      
}
  return (
    <div className="row">
      <div>
        <br />
        <div className="card">
          <div className="card-header bg-custom">
            <h4>View Booking</h4>
          </div>
          <div className="card-body">
            <form className="form" data-testid="viewBooking-form">
              {/* 1. Form should be controlled
                2. Event handling methods should be binded appropriately
                3.Invoke the appropriate method on form submission using the <form> tag */}

              <div className="form-group-view">
                <label>Booking Id</label>
                <input
                  
                  type="text"
                  data-testid="bookingId"
                  name="bookingId"
                  className="form-control"
                  placeholder="Enter a booking id"
                  value={state.bookingId}
                  onChange={handleChange}


                />
                {/* Invoke necessary data handler*/}
                <button
                  type="submit"
                  name="button"
                  className="btn btn-primary mt-2"
                  onClick={(e)=>{handleAction("View"); e.preventDefault()}}

                >
                  Get Booking
                </button>

                {state.bookingData ? (
                  <table className="table bordered">
                    <thead className="thead">
                      <tr>
                        <th>Booking Id</th>
                        <th>Bouquet Name</th>
                        <th>Email Id</th>
                        <th>No of Bouquet</th>
                        <th>Booking Date</th>
                        <th>Action Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{state.bookingData.id}</td>
                        <td>{state.bookingData.bouquetName}</td>
                        <td>{state.bookingData.emailId}</td>
                        <td>{state.bookingData.flowerCount}</td>
                        <td>{state.bookingData.bookedOn}</td>
                        {/* On the click of the 'Delete' button call the method handleAction() method and pass the parameter 'onDelete' to handleAction() method  */}
                        <td>
                          <button
                            className="btn btn-danger mt-2 ms-2"
                            data-testid="delete-button"
                            onClick={(e)=>{handleAction("Delete"); e.preventDefault()}}


                          >
                            Delete
                          </button>
                        
                          <button
                            className="btn btn-success mt-2 ms-2"
                            data-testid="update-button"
                            onClick={(e)=>{handleAction("Update"); e.preventDefault()}}


                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : null}
                {/*Using the concept of conditional rendering,display the value of the state infoMessage */}

                <p data-testid="message" className="text-info mt-2"></p>

                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewBooking;

  
