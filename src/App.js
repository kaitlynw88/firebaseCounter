import './App.css';
import app from './firebase.js';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import React from 'react';

import Counter from './Counter';



function App(props) {


  const [comments, setComments] = useState([]);

  const [userInput, setUserInput] = useState('');


  useEffect(() => {
    const database = getDatabase(app);
    const dbRef = ref(database, "comments");

    onValue(dbRef, (resp) => {
      const data = resp.val()
      const updatedDatabaseInfo = [];

      for (let key in data) {
        updatedDatabaseInfo.push({
          key: key,
          name: data[key],
        });
      }
      // Passing that array INTO our setComments function to update our stateful variable

      setComments(updatedDatabaseInfo);
    })
  }, [])

  const handleInputChange = (e) => {
    setUserInput(e.target.value)

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const commentObject = {
      comment:userInput,
      counter: 0
    }
    const database = getDatabase(app);
    const dbRef = ref(database, "comments");

    push(dbRef, commentObject);

    setUserInput('');
  }

  const handleRemoveComment = (commentId) => {
    const database = getDatabase(app);
    const dbRef = ref(database, `comments/${commentId}`)

    remove(dbRef);
  }

  return (
    <>
      
      <div className="App wrapper">
        
        <form action="submit">
          <label htmlFor="newComment">Spill the tea below</label>

          <textarea type="text" id="newComment" onChange={handleInputChange} value={userInput} />

          <button className="postButton" onClick={handleSubmit}>Post</button>
        </form>

        <ul id="displayedComments">

          {comments.map((indComment) => {
            

            // console.log(indComment.key)
            return (
                
              <li key={indComment.key}>
                <p>{indComment.name.comment}</p>
                <Counter commentKey={indComment.key}/>

                <button
                  className="closeButton"
                  onClick={() => handleRemoveComment(indComment.key)}>
                   
                </button>
              </li>
            )

          })}
        </ul>
        
      </div>
    </>
  );
}


export default App;
