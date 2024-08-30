import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import './home.css'; // Import the CSS file
import { useAuth } from '../LoginPage/AuthContext';

function Home() {
  const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
  const [tag,setTag]= useState('')
  const { logout } = useAuth();

  const handleInputChange = (id, event) => {
    const newInputs = inputs.map((input) =>
      input.id === id ? { ...input, value: event.target.value } : input
    );
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { id: inputs.length + 1, value: '' }]);
  };

  const handleRemoveInput = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const handleTag = (e) => {
    setTag(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
        questions: inputs.map(input => input.value),
        tag: tag
      };
      console.log('Form Submitted', JSON.stringify(formData, null, 2));
  };

  return (
    <div className="homePageBox">
        <div
        className="logout-button-container"
        >
        <Button
        className="logout-button"
        variant="contained"
        color="secondary"
        onClick={logout} // Call the logout function
        
      >
        Logout
      </Button>
      </div>
      <h1>Add Questions</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <div key={input.id} className="input-container">
            <input
              type="text"
              value={input.value}
              onChange={(event) => handleInputChange(input.id, event)}
              placeholder={index === 0 ? 'Write question' : 'Option'} // Conditional placeholder
              className="input-field"
            />
            {index !== 0 && ( // Conditionally render delete button for all inputs except the first one
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveInput(input.id)}
                className="delete-button"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}
        <Button
          variant="contained"
          onClick={handleAddInput}
          className="add-button"
        >
          Add Input
        </Button>
        <br />
        <br />
        <input
        type='text'
        onChange={handleTag}
        placeholder='Enter Tag'
        className="input-field"
        />
        <Button
          className="add-button"
          variant="contained"
          type="submit"
          style={{ marginTop: '10px' }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Home;
