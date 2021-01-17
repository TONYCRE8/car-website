import React, {useRef, useEffect} from 'react'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import gsap, {Power1} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

function Car() {
    if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger); 
    }

    const elRef = useRef(null)
    function handleScene() {
        var scene = new THREE.Scene();
        
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 100)
        camera.position.set(-1.6,0,5)
        scene.rotation.y = -0.3
        scene.rotation.x = 0.05
        var renderer = new THREE.WebGL1Renderer({alpha: true, antialias: true});
        
        var light = new THREE.AmbientLight( 0xffffff, 100);
        scene.add(light)

        var directionalLight = new THREE.DirectionalLight(0xffffff, 100);
        directionalLight.position.set(0,1,0);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        renderer.setSize( window.innerWidth, window.innerHeight);

        /* var geometry = new THREE.BoxGeometry(1,1,1)
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
        var cube = new THREE.Mesh(geometry, material)

        scene.add(cube) */
        
        if(elRef.current) {
            elRef.current.append(renderer.domElement)
        }

        let gltfLoader = new GLTFLoader();
        //const url = 'https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf'
        const url = '/models/car.gltf'

        gltfLoader.load(url, ( gltf ) => {
            const root = gltf.scene;
            root.scale.set(0.3,0.3,0.3)
            scene.add(root);
            animate();
        })

        scene.rotation.set(0, 1.4, 0)
        camera.position.set(-0.9,.4,4)

        let car_anim = gsap.timeline({
            duration: 1,
            scrollTrigger: {
                trigger: "#slide2",
                endTrigger: "#slide4",
                start: "top top",
                end: "+=5000",
                scrub: 1
            }
        })
        ScrollTrigger.defaults({
            immediateRender: false,
            ease: Power1.inOut
        })
        // Slide 2
        car_anim
            .add("slide2", 0)
            .add("slide3", 10)
            .add("slide4", 20)
            .add("slide5", 30)
        car_anim
            .to(scene.rotation, {y: 0, duration: 4}, "slide2")
            .to(camera.position, {x: 0, z: 5, duration: 4}, "slide2") 
        // Slide 3
            .to(scene.rotation, {x: -1.6, duration: 4}, "slide3")
            .to(camera.position, {x: .05, y: 0, duration: 4}, "slide3")
        // Slide 4
            .to(camera.position, {z: 4.2, x: .01, y: .3, duration: 4}, "slide4")
            .to(scene.rotation, {x: .035, y: -1.575, duration: 4}, "slide4")
        // Slide 5
            .to(camera.position, {x: .015, z: 0.09, y: 0.65, duration: 4}, "slide5")
        /*let vrrr = (bool) => {
            if (bool === true) {
                for(let i = 0; i < 10; i++) {
                    scene.position.set(0,rand(-.005, .01), 0)
                }
            }
        }*/
        let rand = function(min, max) {
            return (Math.random() * (max - min))
        }

        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
            // vrrr(true)
            // GSAP fun
        }
    }
    useEffect(() => {
        handleScene()
    })

    return (
        <div className="car" ref={elRef}/>
    )
}



export default Car