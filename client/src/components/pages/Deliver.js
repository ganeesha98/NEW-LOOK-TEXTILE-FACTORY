import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Deliver() {
  let history = useHistory();
  const { id } = useParams();

  const [payment, setPayment] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    sAddress: "",
    pCode: "",
    method: "",
  });

  const { fullName, phone, email, country, city, sAddress, pCode, method } =
    payment;

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    await axios
      .get("http://localhost:5000/payment/get/" + id)
      .then((result) => {
        setPayment(result.data);
      });
  };

  const [deliver, setDeliver] = useState({
    cusName: "",
    cusCountry: "",
    cusCity: "",
    cusEmail: "",
    cusPhone: "",
    cusPCode: "",
    driverName: "",
    vehicleNo: "",
    driverID: "",
    deliveryTime: "",
    driverPhone: "",
  });

  const {
    cusName,
    cusCountry,
    cusCity,
    cusEmail,
    cusPhone,
    cusPCode,
    driverName,
    vehicleNo,
    driverID,
    deliveryTime,
    driverPhone,
  } = deliver;

  const onInputChange = (e) => {
    setDeliver({ ...deliver, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const valid = formValidation();
    if (valid) {
      await axios
        .post(
          "http://localhost:5000/deliver/add/" +
            fullName +
            "/" +
            country +
            "/" +
            city +
            "/" +
            email +
            "/" +
            phone +
            "/" +
            pCode +
            "/" +
            driverName +
            "/" +
            vehicleNo +
            "/" +
            driverID +
            "/" +
            deliveryTime +
            "/" +
            driverPhone
        )
        .then(async () => {
          alert("Deliver added successfully");

          await axios.delete("http://localhost:5000/payment/delete/" + id);
        })
        .catch((err) => {
          alert(err);
        });
      history.push("/section/addDeliverTable");
    }
  };

  const formValidation = () => {
    let isValid = true;

    if (driverName.trim().length === 0) {
      toast.error("Please insert color");
      isValid = false;
    } else if (vehicleNo.trim().length === 0) {
      toast.error("Please insert size");
      isValid = false;
    } else if (driverID.trim().length === 0) {
      toast.error("Please insert quantity");
      isValid = false;
    } else if (deliveryTime.trim().length === 0) {
      toast.error("Please insert quantity");
      isValid = false;
    } else if (driverPhone.trim().length === 0) {
      toast.error("Please insert quantity");
      isValid = false;
    }

    return isValid;
  };

  return (
    <div class="driver-include">
      <form onSubmit={(e) => onSubmit(e)}>
        <ToastContainer
          style={{
            width: "450px",
            textAlign: "center",
            fontSize: "17px",
            fontFamily: "fantasy",
          }}
          position="top-center"
          theme="light"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={1}
        />

        <br />
        <center>
          <h3>Delivery Page</h3>
        </center>
        <br />

        <table class="driver-table">
          <tr>
            <td>
              Customer Name
              <input
                type="text"
                name="cusName"
                value={fullName}
                placeholder="Enter Full Name"
              />
            </td>
            <td className="tb-right">
              Country
              <input
                type="text"
                name="cusCountry"
                value={country}
                placeholder="Enter contry"
              />
            </td>
          </tr>
          <tr>
            <td>
              City
              <input
                type="text"
                name="cusCity"
                value={city}
                placeholder="Enter Your city"
              />
            </td>
            <td className="tb-right">
              E-mail
              <input
                type="text"
                name="cusEmail"
                value={email}
                placeholder="Enter Your E-mail"
              />
            </td>
          </tr>
          <tr>
            <td>
              Customer Phone
              <input
                type="text"
                name="cusPhone"
                value={phone}
                placeholder="Enter Your phone Number"
              />
            </td>
            <td className="tb-right">
              Postal Code
              <input
                type="text"
                name="cusPCode"
                value={pCode}
                placeholder="Enter postal Code"
              />
            </td>
          </tr>
          <tr>
            <td>
              Driver Name
              <input
                type="text"
                name="driverName"
                value={driverName}
                placeholder="Enter  Driver Name"
                onChange={(e) => onInputChange(e)}
              />
            </td>
            <td className="tb-right">
              Vehicle Number
              <input
                type="text"
                name="vehicleNo"
                value={vehicleNo}
                placeholder="Enter  Vehicle Number"
                onChange={(e) => onInputChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td>
              Driver ID
              <input
                type="text"
                name="driverID"
                value={driverID}
                placeholder="Enter  Driver ID"
                onChange={(e) => onInputChange(e)}
              />
            </td>
            <td className="tb-right">
              Delivery Time
              <input
                type="text"
                name="deliveryTime"
                value={deliveryTime}
                placeholder="Enter  Delivery Time"
                onChange={(e) => onInputChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td>
              Driver Phone Number
              <input
                type="text"
                name="driverPhone"
                value={driverPhone}
                placeholder="Enter  Driver phone number"
                onChange={(e) => onInputChange(e)}
              />
            </td>
          </tr>
        </table>
        <br />
        <br />

        <center>
          <table>
            <tr>
              <td>
                <button type="reset" class="button">
                  Reset
                </button>
              </td>
              <td>
                <button type="submit" onclick="" class="button">
                  Confirm
                </button>
              </td>
            </tr>
          </table>
        </center>
      </form>
    </div>
  );
}
