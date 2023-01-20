import { useState, useEffect } from 'react';
import app from './firebase.js'
import { getDatabase, ref, onValue, push, remove, update, set, increment } from 'firebase/database';
import React from 'react';

// add props as a property in this Counter function
function Counter(props){
    const [counter, setCounter] = useState(0);
    
    useEffect(() => {
        const database = getDatabase(app);
        const counterRef = ref(database, `comments`)
        onValue(counterRef, (resp) => {
            const data = resp.val()
            
            
            console.log(data[props.commentKey].counter)
            // set our counter to be the counter value in firebase
            setCounter(data[props.commentKey].counter)
        })
    
    }, [])


    const handleLike = () => {
        const database = getDatabase(app);
        const counterRef = ref(database, `comments/${props.commentKey}`)
        // we need to reference the individualComment Counter value from Firebase, so that we can update its value whenever a person likes it.
        console.log("you liked it!")
        
        // update our counter reference in firebase, and increment it by one.  
        update(counterRef, {counter: increment(1)})
    
       
    }

    return(
        <>
            <p onClick={handleLike}>Counter value is at: {counter}</p>
        </>
    )
}

export default Counter