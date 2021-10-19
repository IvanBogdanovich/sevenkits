import React from 'react'

function Wrapper({ children }) {
    return (
        <div style={
            {
                border: '10px solid rebeccapurple',
                color: 'tomato',
                fontFamily: 'system-ui, sans-serif',
                fontSize: '24px',
            }
        }>
            {children}
        </div>
    )
}

export default Wrapper
