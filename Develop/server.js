// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Create an instance of Express
const app = express();

// Define a port for your server
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to serve static files (HTML, CSS, client-side JS)
app.use(express.static('public'));

// Define HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Define API routes

app.post('/api/notes', (req, res) => {
    // Read the existing notes from the db.json file
    const dbFilePath = path.join(__dirname, 'db','db.json');
    const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
  
    // Generate a unique ID for the new note (using a function like generateUniqueId)
    const newNoteId = uuidv4();
  
    // Create a new note object with the provided data and generated UUID
    const newNote = {
      id: newNoteId, // Use the generated UUID
      title: req.body.title,
      text: req.body.text,
    };
  
    // Add the new note to the existing data
    dbData.push(newNote);
  
    // Write the updated data back to the db.json file
    fs.writeFileSync(dbFilePath, JSON.stringify(dbData, null, 2));
  
    // Respond with the newly added note as JSON
    res.json(newNote);
  
   
  // Call the renderNoteList function to update the sidebar
   renderNoteList();
  });
  
  // Function to generate a unique ID (replace with your logic)
  function generateUniqueId() {
    // Replace with your actual unique ID generation logic
    return Date.now().toString();
  }

  // Function to read and return notes from db.json
app.get('/api/notes', (req, res) => {
  // Read the existing notes from the db.json file
  const dbFilePath = path.join(__dirname, 'db', 'db.json');
  const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

  // Send the notes data as a JSON response
  res.json(dbData);
});

  // Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
