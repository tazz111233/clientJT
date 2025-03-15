import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/ForPass.css";

const SecurityQuestionChecker = () => {
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(""); // Store the correct answer in state
  const [newPassword, setNewPassword] = useState(""); // Store new password input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [passwordUpdated, setPasswordUpdated] = useState(false); // Track password change status

  const navigate = useNavigate(); // Initialize navigate

  const fetchSecurityQuestion = async () => {
    setLoading(true);
    setError("");
    setQuestion(null);
    setVerificationResult(null);
    setAnswer("");
    
    try {
      const response = await fetch(`https://backendjt-1.onrender.com/get-question-answer/${username}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch data");
      }

      setQuestion(result.question);
      setCorrectAnswer(result.answer); // Store correct answer in state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setVerificationResult("Correct answer!");
    } else {
      setVerificationResult("Incorrect answer. Try again.");
    }
  };

  const changePassword = async () => {
    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    try {
      const response = await fetch("https://backendjt-1.onrender.com/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPasswordUpdated(true);
        navigate("/"); // Redirect to login page after password update
      } else {
        setError(result.message || "Failed to change password.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="wow">
    <div className="container2">
      <h2>Verify Security Question</h2>
      
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <button onClick={fetchSecurityQuestion} disabled={!username || loading}>
        {loading ? "Fetching..." : "Get Security Question"}
      </button>

      {error && <p className="error">{error}</p>}
      
      {question && !passwordUpdated && (
        <div className="question-section">
          <p><strong>Question:</strong> {question}</p>
          <input
            type="text"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={checkAnswer} disabled={!answer}>
            Submit Answer
          </button>
          {verificationResult && <p className="result">{verificationResult}</p>}
        </div>
      )}

      {verificationResult === "Correct answer!" && !passwordUpdated && (
        <div className="new-password-section">
          <h3>Enter New Password</h3>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={changePassword} disabled={!newPassword}>
            Change Password
          </button>
        </div>
      )}

      {passwordUpdated && <p className="success">Password updated successfully!</p>}
    </div>
    </div>
  );
};

export default SecurityQuestionChecker;
