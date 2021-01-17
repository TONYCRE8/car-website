import React, {useEffect} from 'react'
import {tsParticles} from 'tsparticles'
import rect from "./rect.svg"

const options = {
    "number": {
        "value": .1,
        "density": {
            "enable": true,
            "value_area": 1000,
        }
    },
    "particles": {
        "color": {
            "value": "#f7c3d3"
        },
        "move": {
            "direction": "right",
            "enable": true,
            "straight": true,
            "speed": 20,
            "out_mode": "out",
        },
        "size": {
            "value": 10,
        },
        "shape": {
            "options": {
                "image": {
                    "height": 100,
                    "width": 200,
                    "replaceColor": true,
                    "src": rect
                }
            },
            "type": "image"
        }
    },
    "line_linked": {"enable": false},
}

function Speed() {
    useEffect(() => {
        tsParticles.load("particles", options)
    })
    return (
        <>
            <div id="particles"/>
        </>
    )
}

export default Speed
