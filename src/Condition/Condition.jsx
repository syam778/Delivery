/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Condition.css";

const Condition = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!agreed) {
      alert("Please accept the Terms & Conditions to continue ❌");
      return;
    }
    navigate("/next-page"); // change to your route
  };

  return (
    <div className="terms-container">
      <div className="terms-card">
        <h2>Terms & Conditions</h2>

        <div className="terms-box">
          <ol>
            <li>The user confirms that all provided information is true.</li>
            <li>No fake or misleading data is allowed.</li>
            <li>User is responsible for account security.</li>
            <li>User data is stored securely.</li>
            <li>Data will not be sold without consent.</li>
            <li>User must follow applicable laws.</li>
            <li>Incorrect data is user responsibility.</li>
            <li>Service notifications may be sent.</li>
            <li>Misuse may lead to suspension.</li>
            <li>Terms may change anytime.</li>
            <li>Continued use means acceptance.</li>
            <li>Service is provided as-is.</li>
            <li>No liability for indirect damages.</li>
            <li>Illegal usage is prohibited.</li>
            <li>Acceptance is mandatory to proceed.</li>
          </ol>
        </div>

        <div className="terms-check">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="agree">
            I agree to the Terms & Conditions
          </label>
        </div>

        <button
          className="next-btn"
          onClick={handleNext}
          disabled={!agreed}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Condition;
*/
import React from "react";
import "./Condition.css";

const Condition = () => {
  return (
    <div className="terms-container">
      <div className="terms-card">
        <h2>Terms & Conditions</h2>

        <ol className="terms-list">
          <li>User must provide accurate and complete information.</li>
          <li>Providing false or misleading data is strictly prohibited.</li>
          <li>User is responsible for maintaining data confidentiality.</li>
          <li>All submitted information may be securely stored.</li>
          <li>User data will not be shared without permission.</li>
          <li>User agrees to follow all applicable laws and regulations.</li>
          <li>Service provider is not responsible for incorrect submissions.</li>
          <li>Service availability may change without notice.</li>
          <li>Misuse of the service may result in termination.</li>
          <li>Terms may be updated at any time.</li>
          <li>Continued use implies acceptance of updated terms.</li>
          <li>Service is provided on an “as-is” basis.</li>
          <li>No liability for indirect or incidental damages.</li>
          <li>Illegal activities using the platform are prohibited.</li>
          <li>Using this service means you accept all terms listed above.</li>
        </ol>
      </div>
    </div>
  );
};

export default Condition;
