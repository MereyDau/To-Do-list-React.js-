import React, {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(0)

    function increment(){
        setCount(count + 1 )
    }

    function decrements(){
        setCount(count - 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrements}>Decrement</button>
        </div>
    );
};

export default Counter;