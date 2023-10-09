import React, { useState } from 'react'

function App() {
    const [counter, setCounter] = useState(0)

    const onChangeCounter = () => {
        setCounter(counter + 1)
    }

    const onDecrement = () => {
        setCounter(counter - 1)
    }

    return (
        <>
            <h1>counter : {counter}</h1>
            <button onClick={onChangeCounter}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
        </>
    )
}

export default App
