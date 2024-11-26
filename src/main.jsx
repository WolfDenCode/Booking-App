import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import deluxe1 from "./assets/images/deluxe1.jpg";
import deluxe2 from "./assets/images/deluxe2.jpg";
import family_suite1 from "./assets/images/family_suite1.jpg";
import family_suite2 from "./assets/images/family_suite2.webp";
import family_suite3 from "./assets/images/family_suite3.jpg";
import standard1 from "./assets/images/standard1.jpg";
import standard2 from "./assets/images/standard2.webp";

import AllRooms from "./components/AllRooms.jsx";
import BookingComponent from "./components/BookingComponent.jsx";
import AuthForm from "./components/AuthForm.jsx";

// let roomData = [
//   {
//     roomId: "101",
//     roomName: "Deluxe Suite",
//     roomType: "Suite",
//     isOccupied: true,
//     occupiedDates: [
//       {
//         date: "2024-11-10",
//       },
//       {
//         date: "2024-11-11",
//       },
//     ],
//     pricePerNight: 150,
//     currency: "USD",

//     maxOccupancy: 2,
//     images: [deluxe1, deluxe2],
//     description: "A spacious suite with a beautiful view.",
//   },
//   {
//     roomId: "102",
//     roomName: "Standard Room",
//     roomType: "Standard",
//     isOccupied: false,
//     occupiedDates: [],
//     pricePerNight: 100,
//     currency: "USD",

//     maxOccupancy: 2,
//     images: [standard1, standard2],
//     description: "A cozy room ideal for single travelers or couples.",
//   },
//   {
//     roomId: "201",
//     roomName: "Family Suite",
//     roomType: "Suite",
//     isOccupied: false,
//     occupiedDates: [
//       {
//         date: "2024-11-25",
//         occupierInfo: {
//           uid: "guest789",
//           name: "Jane Smith",
//           contact: "janesmith@example.com",
//         },
//       },
//     ],
//     pricePerNight: 200,
//     currency: "USD",
//     maxOccupancy: 4,
//     images: [family_suite1, family_suite2, family_suite3],
//     description:
//       "Perfect for families, with spacious living and a kitchenette.",
//   },
// ];
let currentUser = null;
const handleAuthentication = async (data, isLogin) => {
  if (isLogin) {
    console.log("Logging In", data);
    currentUser = data;
    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentUser.email,
          password: currentUser.password,
          username: currentUser.email,
        }), // Payload
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Login successful:", data);

      localStorage.setItem("user", data);
      return data;
    } catch (error) {
      console.error("Error during login:", error);
    }
  } else {
    console.log("Registering", data);
    currentUser = data;
    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentUser.email,
          password: currentUser.password,
          username: currentUser.email,
          full_name: currentUser.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Register failed");
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Register successful:", data);
      localStorage.setItem("user", data);
      return data; // This may include token or user info
    } catch (error) {
      console.error("Error during register:", error);
    }
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <BookingComponent></BookingComponent>,
      },
      {
        path: "/all-rooms",
        element: <AllRooms></AllRooms>,
      },
      {
        path: "/auth",
        element: (
          <AuthForm
            isLogin={false}
            submitCallback={(data, islogin) =>
              handleAuthentication(data, islogin)
            }
          ></AuthForm>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
