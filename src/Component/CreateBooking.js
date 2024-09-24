import React, { useState } from "react";
import { validation } from "../Validators/Validation";
import axios from "axios";

let url = "http://localhost:4000/bookings/";

const BookingComponent = (props) => {
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setState] = useState({
    bouquetName: "",
    bookedOn: "",
    emailId: "",
    flowerCount: "",
  });
  //state to hold the individual validation errors of the form fields
  const [formErrors, setFormErrors] = useState({
    emailIdError: "",
    flowerCountError: "",
    bouquetNameError: "",
    bookedOnError: "",
  });
  //state variable to indicate whether user has given values to all the mandatory fields of the form.
  const [mandatory, setMandatory] = useState(false);
  //state variable to capture the success Message once the booking is completed successfully.
  const [successMessage, setSuccessMessage] = useState("");
    // state variable used to disable the button when any of the given form values is invalid
  const [valid, setvalid] = useState(false);
//state variable to capture the Error Message when there is any error with booking.
  const [errorMessage, setErrorMessage] = useState("");

  //A collection of few messages that the component displays.
  // Wherever applicable, pls use the following json to display the messages instead of hardcoding the messages.
  const [messages] = useState({
    EMAILID_ERROR: "Please enter valid email",
    FLOWER_COUNT_ERROR: "Bouquet count(s) should be 1 or more",
    BOUQUET_NAME_ERROR: "Please select bouquet type",
    BOOKED_ON_ERROR: "Booking date should be after today's date",
    ERROR: "Something went wrong",
    MANDATORY: "Enter all the form fields",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. This method will be invoked when user clicks on 'Book Bouquet' button.
    // 2. You should prevent page reload on submit
    // 3. check whether all the form fields are entered. If any of the form fields is not entered set the mandatory state variable to true.
    // 4.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/bookings/" and pass the appropriate state as data to the axios call
    // 5. If the axios call is successful, assign the below string to successMessage state:
    //   "Booking is successfully created with bookingId: " + <id>
    // 6. If the axios call is not successful, assign the error message to "Something went wrong"
    if(state.bouquetName!="" || state.bookedOn!="" || state.emailId!="" || state.flowerCount!=""){
      setMandatory(true);
      
      // setSuccessMessage("Booking is successfully created with bookingId: " + <id>);
      setvalid(true);
      setErrorMessage("")
      axios.post("http://localhost:4000/bookings/", state).then((res) => {

       alert("Booking is successfully created with bookingId:" + res.data.id)
    }).catch((err) => {
      //console.log(err)
      alert("Something Went Wrong")
    })

    }else{
      setMandatory(false);
    }
 
  };

  const handleChange = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       4. call the validateField method for validating form fields.

       */
      // event.preventDefault()
    const {value, name} = event.target
    setState({...state,[name]:value})
    setFormErrors(validateField(state))

    
  
  };

  const validateField = (name, value) => {
    /*
1. Write validation for all input fields as given below:
      bouquetName:  use validateBouquet method of validator.js
      emailId: use validateEmail method of validator.js
      flowerCount: use validate flowerCount method of validator.js
      bookedOn: use validateDate method of validator.js
  

2. Set error message in errorFormMessage state respectively when validation fails.
   error messages are given below:
      bouquetNameError: "Please select bouquet type"
      emailIdError: "Please enter valid email"
      flowerCountError: "Bouquet count(s) should be 1 or more"
      bookedOnError: "Booking date should be after today's date"
*/

    // 3. If all fields are valid, setting state of valid as true.
    // if(state.bouquetName && state.emailId && state.flowerCount && state.bookedOn){
    //   setvalid(true)
    // }
    const kuchbhi = {
      emailIdError: "",
    flowerCountError: "",
    bouquetNameError: "",
    bookedOnError: "",
    }

    if(!validation.validateBouquet(name.bouquetName)){
      kuchbhi.bouquetNameError = messages.BOUQUET_NAME_ERROR
    }else{
      setvalid(false)
    }
    if(!validation.validateEmail(name.emailId)){
      kuchbhi.emailIdError = messages.EMAILID_ERROR
    }else{
      setvalid(false)
    }
    if(!validation.validFlowerCount(name.flowerCount)){
      kuchbhi.flowerCountError = messages.FLOWER_COUNT_ERROR
    }else{
      setvalid(false)
    }
    if(!validation.validDate(name.bookedOn)){
      kuchbhi.bookedOnError = messages.BOOKED_ON_ERROR
    }else{
      setvalid(false)
    }
    if(validation.validateBouquet(name.bouquetName) && 
       validation.validateEmail(name.emailId) && 
       validation.validFlowerCount(name.flowerCount) &&
       validation.validDate(name.bookedOn)){
      setvalid(true);

        }
    console.log(formErrors)
    return kuchbhi

  };

  return (
    <>
      <div className="CreateBooking">
        <div className="row">
          <div>
            <br />
            <div className="card" style={{ width: "500px" }}>
              <div className="card-header bg-custom">
                <h4>Book Your Bouquet</h4>
              </div>
              <div className="card-body">
                <form className="form" data-testid="bouquet-form" noValidate>
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
                      value={state.bouquetName}
                      onChange={handleChange}
                    >
                      <option>
                        Select a bouquet
                      </option>
                      <option value="RosalineRed">Rosaline Red</option>
                      <option value="TerifficTulip">Teriffic Tulip</option>
                      <option value="ChineseChandelier">
                        Chinese Chandelier
                      </option>
                    </select>
                    {/* Check whether the bouquetName error is set, if set display the corresponding error message using conditional rendering
                     */}

                    <span className="text-danger">{formErrors.bouquetNameError}</span>
                  </div>
                  <div className="form-group">
                    <label>Email Id</label>
                    <input
                      type="email"
                      data-testid="emailId"
                      name="emailId"
                      className="form-control"
                      placeholder="Enter your email"
                      value={state.emailId}
                      onChange={handleChange}
                    ></input>

                    {/* Check whether the emailId error is set, if set display the corresponding error message using conditional rendering
                     */}

                    <span className="text-danger">{formErrors.emailIdError}</span>
                  </div>
                  <div className="form-group">
                    <label>No of Bouquet</label>
                    <input
                      type="number"
                      data-testid="flowerCount"
                      name="flowerCount"
                      className="form-control"
                      placeholder="Number of Bouquets"
                      value={state.flowerCount}
                      onChange={handleChange}
                    ></input>

                    {/* Check whether the flowerCount error is set, if set display the corresponding error message using conditional rendering
                     */}

                    <span className="text-danger">{formErrors.flowerCountError}</span>
                  </div>
                  <div className="form-group">
                    <label>Booking Date</label>
                    <input
                      type="date"
                      data-testid="bookedOn"
                      name="bookedOn"
                      className="form-control"
                      value = {state.bookedOn}
                      onChange={handleChange}
                    ></input>

                    {/* Check whether the bookedOn error is set, if set display the corresponding error message using conditional rendering
                     */}

                    <span className="text-danger">{formErrors.bookedOnError}</span>
                  </div>
                  <br />
                  {/* Bind the disabled attribute to the button to the valid state variable */}
                  <button
                    disabled={!valid}
                    data-testid="button"
                    type="submit"
                    name="active"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Book Bouquet
                  </button>
                  {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                  {/* {if the form fields are not entered then set the message as 'Enter all the form fields'} */}
                  { !valid ? <div data-testid="mandatory" className="text-danger">{messages.MANDATORY}</div> : null}


                  {successMessage ? <div data-testid="success" className="text-success">{successMessage}</div>: 
           

                  <div data-testid="error" className="text-danger">{errorMessage}</div>}

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingComponent;
