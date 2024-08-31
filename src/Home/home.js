import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import "./home.css"; // Import the CSS file
import { useAuth } from "../LoginPage/AuthContext";
import { generateUniqueId } from "../utils/idGeneration";

function Home() {
  const [inputPairs, setInputPairs] = useState([
    { id: 1, option1: "", option2: "" }, // Initial input pair for question and translated question
  ]);
  const [id, setId] = useState("");
  const [tag, setTag] = useState("");
  const [solution, setSolution] = useState(""); // State for Solution input
  const [description, setDescription] = useState(""); // State for Description input
  const { logout } = useAuth();
  useEffect(() => {
    const idGeneration = generateUniqueId();
    setId(idGeneration);
  }, []);
  // const id=generateUniqueId()

  const handleInputChange = (id, index, event) => {
    const newInputPairs = inputPairs.map((inputPair) =>
      inputPair.id === id
        ? { ...inputPair, [index]: event.target.value }
        : inputPair
    );
    setInputPairs(newInputPairs);
  };

  const handleAddInputPair = () => {
    setInputPairs([
      ...inputPairs,
      { id: inputPairs.length + 1, option1: "", option2: "" },
    ]);
  };

  const handleRemoveInputPair = (id) => {
    setInputPairs(inputPairs.filter((inputPair) => inputPair.id !== id));
  };

  const handleTag = (e) => {
    setTag(e.target.value);
  };

  const handleSolutionChange = (e) => {
    setSolution(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      questions: inputPairs.map((inputPair, index) => {
        if (index === 0) {
          return {ques:{
            question: inputPair.option1,
            translated: inputPair.option2,
          }};
        } else {
          return {[`opt${index}`]:{
            option: inputPair.option1,
            translated: inputPair.option2,
          }};
        }
      }),
      tag: tag,
      solution: solution, // Include solution in the form data
      description: description, // Include description in the form data
    };
    console.log('Form Submitted', JSON.stringify(formData, null, 2));
  };

  return (
    <div className="homePageBox">
      <div className="logout-button-container">
        <Button
          className="logout-button"
          variant="contained"
          color="secondary"
          onClick={logout} // Call the logout function
        >
          Logout
        </Button>
      </div>
      <h1>Add Questions and it's id:-{id}</h1>
      <form onSubmit={handleSubmit}>
        {inputPairs.map((inputPair, index) => (
          <div key={inputPair.id} className="input-container">
            <input
              type="text"
              value={inputPair.option1}
              onChange={(event) =>
                handleInputChange(inputPair.id, "option1", event)
              }
              placeholder={index === 0 ? "Write question" : `Option ${index}`} // First input has 'Write question'
              className="input-field"
            />
            <input
              type="text"
              value={inputPair.option2}
              onChange={(event) =>
                handleInputChange(inputPair.id, "option2", event)
              }
              placeholder={
                index === 0 ? "Write translated question" : `Option ${index}`
              } // Second input has 'Write translated question'
              className="input-field"
            />
            {index > 0 && ( // Conditionally render delete button only for additional input pairs
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveInputPair(inputPair.id)}
                className="delete-button"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}
        <Button
          variant="contained"
          onClick={handleAddInputPair}
          className="add-button"
        >
          Add Input
        </Button>
        <br />
        <br />
        <input
          type="text"
          value={solution}
          onChange={handleSolutionChange}
          placeholder="Solution"
          className="input-field"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
          className="input-field"
        />
        <input
          type="text"
          onChange={handleTag}
          placeholder="Enter Tag"
          className="input-field"
        />
        <Button
          className="add-button"
          variant="contained"
          type="submit"
          style={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Home;
