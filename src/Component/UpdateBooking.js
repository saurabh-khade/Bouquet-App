import React, { useState ,useEffect} from "react";
import { validation } from "../Validators/Validation";
import { Link ,useNavigate,useParams} from 'react-router-dom'
import axios from "axios";

let url = "http://localhost:4000/bookings/";

const UpdateBooking = (props) => {
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  let [booking,setBooking]=useState({})
  const [bouquetName,setbouquetName]=useState("")
  const [bookedOn,setbookedOn]=useState("")
  const [emailId,setemailId]=useState("")
  const [flowerCount,setflowerCount]=useState("")
  
  //1.When the component is mounted(Use an appropriate hook for the same)
  //make axios call "http://localhost:4000/bookings/" +<booking Id>
  //to retrieve booking details of the given id
  //2.Set the booking state with data retrieved from response object
  //3.set the states bouquetName,emailId,flowerCount,bookedOn with response values.
  //4.set the errMsg state to "Something went wrong " to any error
  const {id} = useParams();
  useEffect ( () => {
    axios.get("http://localhost:4000/bookings/"+ id).then((res) =>{
      setBooking(res.data);
      console.log(booking)
     })

  }, [])
 
 //state varaiable to check success message
  const [success, setSuccessMessage] = useState("");
  //state variable to chek Error message
  const [errMsg, setErrorMessage] = useState("");

  const [messages] = useState({
   
    ERROR: "Something went wrong",
    MANDATORY: "Enter all the form fields",
  });

  //This method will be called to submission of form
  //1.Prevent reload of the page
  //2.Update the object newBooking with the respective state value
  //3.check if form field is empty or not.If yes the set the errMsg state "Something went wrong"
  //4.Else,place an AXIOS call and pass newBooking object as data
   // 5. If the axios call is successful, assign the below string to successMessage state:
  //   "Booking is successfully updated with bookingId: " + <id>

  const update = (e) => {
    e.preventDefault();
    // const {value, name} = e.target
    // setBooking({[name]:value})
    console.log("first4")
    const updateBooking = {

      bouquetName: bouquetName,
      emailId : emailId,
      flowerCount: flowerCount,
      bookedOn : bookedOn

    };
console.log(updateBooking)
    if(bouquetName != "" || emailId != "" || flowerCount != "" || bookedOn !=""){

      axios.put("http://localhost:4000/bookings/"+id, updateBooking).then((res) => {
        console.log("first")
      setSuccessMessage("Booking is successfully updated with bookingId:" + res.data.id)
   }).catch((err) => {
     console.log(err)
     alert("Something Went Wrong")
   })
    }else {
        alert(messages.MANDATORY)
    }
  
  };


  return (
    <React.Fragment>
      <div className="CreateBooking">
        <div className="row">
          <div>
            <br />
            <div className="card" style={{ width: "500px" }}>
              <div className="card-header bg-custom">
                <h4>Book Your Bouquet</h4>
              </div>
              <div className="card-body">
                <form className="form" data-testid="bouquet-form" noValidate >
                  {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                  <div className="form-group">
                    <label>Bouquet Name</label>
                    <select
                      name="bouquetName"
                      data-testid="bouquetName"
                      className="form-control"
                      value={bouquetName}
                      onChange={ (e) =>{setbouquetName(e.target.value)}}
                      >
                      <option value="" disabled>
                        Select a bouquet
                      </option>
                      <option value="RosalineRed">Rosaline Red</option>
                      <option value="TerifficTulip">Teriffic Tulip</option>
                      <option value="ChineseChandelier">
                        Chinese Chandelier
                      </option>
                    </select>
                  
  
                  </div>
                  <div className="form-group">
                    <label>Email Id</label>
                    <input
                      type="email"
                      data-testid="emailId"
                      name="emailId"
                      className="form-control"
                      placeholder= {booking.emailId}
                      value={emailId}
                      onChange={ (e) =>{setemailId(e.target.value)}}></input>

                  
                  </div>
                  <div className="form-group">
                    <label>No of Bouquet</label>
                    <input
                      type="number"
                      data-testid="flowerCount"
                      name="flowerCount"
                      className="form-control"
                      placeholder={booking.flowerCount}
                      value={flowerCount}
                      onChange={ (e) =>{setflowerCount(e.target.value)}}
                     ></input>

                  </div>
                  <div className="form-group">
                    <label>Booking Date</label>
                    <input
                      type="date"
                      data-testid="bookedOn"
                      name="bookedOn"
                      className="form-control"
                      value={bookedOn}
                      onChange={ (e) =>{setbookedOn(e.target.value)}}
                     ></input>

                   
                  </div>
                  <br />
                 
                  <button
                
                    data-testid="button"
                    type="submit"
                    name="active"
                    className="btn btn-primary"
                    onClick={update}
                  >
                    Update Bouquet
                  </button>
                 
                 {success ? <div data-testid="success" className="text-success">{success}</div> : 
                 <div data-testid="error" className="text-danger">{errMsg}</div>}

                 

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdateBooking;

