import React from 'react'

// components
import Wrapper from './components/Wrapper'
import Picture from './components/Picture'

// pic
import MainPic1x from './images/template1x.jpg'
import MainPic2x from './images/template2x.jpg'

function App() {
    return (
        <Wrapper>
            <h2> picture</h2>
            <Picture
                alt='little Asian kid with a bull on a background of mountains. Signature "Wake me up before go go"'
                image={{
                    src: MainPic1x,
                    srcset: {
                        '2x': MainPic2x,
                    }
                }}
            />
        </Wrapper>
    )
}

export default App
