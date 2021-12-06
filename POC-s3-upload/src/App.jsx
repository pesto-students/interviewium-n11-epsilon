import React from "react";
import UploadImageToS3WithNativeSdk from "./UploadImageToS3WithNativeSdk";
import "./App.css";

function App() {
    return (
        <div className="container-fluid" style={{ height: "100vh" }}>
            <h1>AWS Upload</h1>
            <div className="row" style={{ height: "100%", display: 'flex' , flexDirection: 'column' }}>
               <UploadImageToS3WithNativeSdk /> 
            </div>
        </div>
    );
}

export default App;
