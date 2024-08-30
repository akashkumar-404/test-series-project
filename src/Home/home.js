import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import './home.css'; 
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../LoginPage/AuthContext';

function Home() {
  const [inputs, setInputs] = useState([{ id: 1, value: '' },{ id: 2, value: '' }]);
  const [tag,setTag] = useState('');
  const [solution, setSolution] = useState(''); 
  const [description, setDescription] = useState(''); 
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
  const handleSolutionChange = (e) => {
    setSolution(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
        id:uuidv4(),
        questions: inputs.map(input => input.value),
        tag: tag,
        solution: solution, 
        description: description 
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
              placeholder={index === 0 ? 'Write question' : index === 1 ? 'Write translated question' : 'Option'}
              className="input-field"
            />
            {index !== 0 && index !== 1 && ( // Conditionally render delete button for all inputs except the first one
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
          Add Options
        </Button>
       <div className='padding-bottom-top'>
        <input
        type='text'
        onChange={handleTag}
        placeholder='Enter Tag'
        className="input-field"
        />
        </div>
        <div className='padding-bottom-top'>
         <input
          type="text"
          value={solution}
          onChange={handleSolutionChange}
          placeholder="Solution"
          className="input-field"
        />
        </div>
        <div className='padding-bottom-top'>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
          className="input-field"
        />
        </div>
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
