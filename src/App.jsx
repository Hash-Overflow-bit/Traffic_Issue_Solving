/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import "./style.css";
import Back from "./componenets/Back";

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [qrData, setQrData] = useState(""); // State to store QR code data

  // State to store user data
  const [userData, setUserData] = useState({
    name: "",
    idCard: "",
    email: "",
    phone: "",
    carNumber: "",
    lisence: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new user data to the existing data
    const updatedUsers = [...allUsers, userData];
    setAllUsers(updatedUsers); // Update state
    localStorage.setItem("UserData", JSON.stringify(updatedUsers)); // Save to localStorage

    // Generate QR code for the current user
    const dataString = JSON.stringify(userData);
    setQrData(dataString);
    setIsSubmitted(true);
  };
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="Main-container">
      <div className="card form-card">
        <div className="form-header">
          <div>
            <h1>Driver Information</h1>
            <div className="form-sub muted">
              Enter details to generate a secure QR code
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="idCard">ID card</label>
            <input
              id="idCard"
              name="idCard"
              type="text"
              value={userData.idCard}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={userData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="carNumber">Car number</label>
            <input
              id="carNumber"
              name="carNumber"
              type="text"
              value={userData.carNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="full">
            <label htmlFor="lisence">License number</label>
            <input
              id="lisence"
              name="lisence"
              type="text"
              value={userData.lisence}
              onChange={handleChange}
              required
            />
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn secondary"
              onClick={() => {
                setUserData({
                  name: "",
                  idCard: "",
                  email: "",
                  phone: "",
                  carNumber: "",
                  lisence: "",
                });
                setIsSubmitted(false);
                setQrData("");
              }}
            >
              Reset
            </button>
            <button type="submit" className="btn">
              Generate QR
            </button>
          </div>
        </form>
      </div>

      <div className="card qr-panel">
        {isSubmitted ? (
          <>
            <div className="qr-box">
              <div
                style={{
                  width: 160,
                  height: 160,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <QRCode value={qrData} size={144} />
              </div>
            </div>
            <div className="qr-meta center">
              <div className="title">Scan to view driver info</div>
              <div className="muted">{userData.name || "—"}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn"
                onClick={() => {
                  // Download QR as PNG
                  const svg = document.querySelector(".qr-panel svg");
                  if (!svg) return;
                  const serializer = new XMLSerializer();
                  const svgStr = serializer.serializeToString(svg);
                  const canvas = document.createElement("canvas");
                  const img = new Image();
                  const svgBlob = new Blob([svgStr], {
                    type: "image/svg+xml;charset=utf-8",
                  });
                  const url = URL.createObjectURL(svgBlob);
                  img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    const png = canvas.toDataURL("image/png");
                    const a = document.createElement("a");
                    a.href = png;
                    a.download = (userData.name || "qr") + ".png";
                    a.click();
                    URL.revokeObjectURL(url);
                  };
                  img.src = url;
                }}
              >
                Download PNG
              </button>
              <button
                className="btn secondary"
                onClick={() => {
                  navigator.clipboard && navigator.clipboard.writeText(qrData);
                }}
              >
                Copy data
              </button>
            </div>
          </>
        ) : (
          <div className="center muted">
            Your QR will appear here after generating it.
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
