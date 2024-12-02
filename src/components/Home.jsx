import React, { useState } from 'react'
import './style/home.scss'
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr'
import { CgMergeHorizontal, CgMergeVertical } from 'react-icons/cg'
import { IoIosImage, IoMdRedo, IoMdUndo } from 'react-icons/io'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import storeData from './LinkedList'
import { LuFlipHorizontal2, LuFlipVertical2 } from 'react-icons/lu'

const Home = () => {
    const filterElement = [
        {
            name: 'brightness',
            maxValue: 200,

        },
        {
            name: 'grayscale',
            maxValue: 100,

        },
        {
            name: 'sepia',
            maxValue: 100,

        },
        {
            name: 'saturate',
            maxValue: 200,

        },
        {
            name: 'contrast',
            maxValue: 200,

        },
        {
            name: 'hueRotate',
            maxValue: 360,

        },
    ]

    const [property, setProperty] = useState({
        name: 'brightness',
        maxValue: 200
    })

    const [details, setDetails] = useState('')

    const [crop, setCrop] = useState('')

    const [state, setState] = useState({
        image: '',
        brightness: 100,
        grayscale: 0,
        sepia: 0,
        saturate: 100,
        contrast: 100,
        hueRotate: 0,
        rotate: 0,
        vertical: 1,
        horizontal: 1
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value

        })

        // const stateData= state
        // stateData[e.target.name]= e.target.value
        // console.log(stateData)

        // storeData.insert(stateData)
    }

    const handleFilter = (e) => {
        const stateData = state
        stateData[e.target.name] = e.target.value
        // console.log(stateData)

        storeData.insert(stateData)
    }

    const leftRotate = () => {
        setState({
            ...state,
            rotate: state.rotate - 90
        })

        const stateData = state
        stateData.rotate = state.rotate - 90

        storeData.insert(stateData)
    }

    const rightRotate = () => {
        setState({
            ...state,
            rotate: state.rotate + 90
        })

        const stateData = state
        stateData.rotate = state.rotate + 90

        storeData.insert(stateData)
    }

    const verticalFlip = () => {
        setState({
            ...state,
            vertical: state.vertical === 1 ? -1 : 1
        })

        const stateData = state
        stateData.vertical = state.vertical === 1 ? -1 : 1
        // console.log("verticalFlip: ", stateData)

        storeData.insert(stateData)
    }
    const horizontalFlip = () => {
        setState({
            ...state,
            horizontal: state.horizontal === 1 ? -1 : 1
        })

        const stateData = state
        stateData.horizontal = state.horizontal === 1 ? -1 : 1
        // console.log("horizontalflip: ", stateData)

        storeData.insert(stateData)
    }

    const undo = () => {
        const data = storeData.undoEdit()

        console.log(data)

        if (data) {
            setState(data)
        }
    }

    const redo = () => {
        const data = storeData.redoEdit()
        if (data) {
            setState(data)
        }
    }


    const imageHandle = (e) => {
        if (e.target.files.length != 0) {
            // console.log('ok')
            const reader = new FileReader()

            reader.onload = () => {
                setState({
                    ...state,
                    image: reader.result
                })

                const stateData = {
                    image: reader.result,
                    brightness: 100,
                    grayscale: 0,
                    sepia: 0,
                    saturate: 100,
                    contrast: 100,
                    hueRotate: 0,
                    rotate: 0,
                    vertical: 1,
                    horizontal: 1
                }

                storeData.insert(stateData)
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }


    const handleCrop = () => {
        const canvas = document.createElement('canvas')
        // console.log(details.naturalWidth)
        const scaleX = details.naturalWidth / details.width
        const scaleY = details.naturalHeight / details.height

        canvas.width = crop.width
        canvas.height = crop.height

        const ctx = canvas.getContext('2d')

        ctx.drawImage(
            details,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )

        const base64Url = canvas.toDataURL('image/png')
        setState({
            ...state, image: base64Url
        })
    }

    const saveImage = () => {
        const canvas = document.createElement('canvas')
        canvas.width = details.naturalWidth
        canvas.height = details.naturalHeight

        const ctx = canvas.getContext('2d')

        ctx.filter = `brightness(${state.brightness}%) 
                                                grayscale(${state.grayscale}%) 
                                                sepia(${state.sepia}%) 
                                                saturate(${state.saturate}%) 
                                                contrast(${state.contrast}%) 
                                                hue-rotate(${state.hueRotate}deg)`

        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(state.rotate * Math.PI / 180)
        ctx.scale(state.vertical, state.horizontal)

        ctx.drawImage(
            details,
            -canvas.width / 2,
            -canvas.height / 2,
            canvas.width,
            canvas.height
        )

        const link = document.createElement('a')
        link.download = 'image_edit.png'
        link.href = canvas.toDataURL()
        link.click()
    }

    const handleReset = () => {
        setState({
            ...state,
            brightness: 100,
            grayscale: 0,
            sepia: 0,
            saturate: 100,
            contrast: 100,
            hueRotate: 0,
            rotate: 0,
            vertical: 1,
            horizontal: 1
        })

        console.log(state)

        storeData.deleteAllNodes()
        console.log(storeData)

    }

    // console.log(details)
    return (
        <div className='image_editor'>
            <div className="card">
                <div className="card_header">
                    <h2> ---- PixEdit ---- </h2>
                </div>
                <div className="card_body">
                    <div className="sidebar">
                        <div className="side_body">
                            <div className="filter_section">
                                <span>Filters</span>
                                <div className="filter_key">
                                    {
                                        filterElement && filterElement.map((item, index) => (
                                            <button
                                                className={property.name === item.name ? 'active' : ""}
                                                onClick={() => setProperty(item)} key={index}>{item.name}</button>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="filter_slider">
                                <div className="label_bar">
                                    <label htmlFor="range">{property.name}</label>
                                    <span>{state[property.name]}</span>
                                </div>
                                <input type="range" name={property.name} onChange={inputHandle} onMouseUp={handleFilter} value={state[property.name]} max={property.maxValue} />
                            </div>
                            <div className="rotate">
                                <label htmlFor="">Rotate & Flip</label>
                                <div className="icon">
                                    <div onClick={leftRotate}><GrRotateLeft /></div>
                                    <div onClick={rightRotate}><GrRotateRight /></div>
                                    <div onClick={horizontalFlip}><LuFlipVertical2 /></div>
                                    <div onClick={verticalFlip}><LuFlipHorizontal2 /></div>
                                </div>
                            </div>
                        </div>

                        <div className="reset">
                            <button onClick={handleReset}>Reset</button>
                            <button className='save'
                                onClick={saveImage}
                            >Save Image</button>
                        </div>
                    </div>

                    <div className="image_section">
                        <div className="image">
                            {/* {
                                console.log(state.brightness)
                            } */}

                            {
                                state.image ?

                                    <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                                        <img
                                            onLoad={(e) => setDetails(e.currentTarget)}
                                            style={{
                                                filter: `brightness(${state.brightness}%) 
                                                grayscale(${state.grayscale}%) 
                                                sepia(${state.sepia}%) 
                                                saturate(${state.saturate}%) 
                                                contrast(${state.contrast}%) 
                                                hue-rotate(${state.hueRotate}deg)`,

                                                transform: `rotate(${state.rotate}deg) scale(${state.vertical}, ${state.horizontal})`
                                            }}
                                            src={state.image} alt="" />
                                    </ReactCrop>

                                    :

                                    <label htmlFor="choose">
                                        <IoIosImage />
                                        <span>Choose Image</span>
                                    </label>
                            }

                        </div>
                        <div className="image_select">
                            <button className='undo' onClick={undo}><IoMdUndo /></button>
                            <button className='redo' onClick={redo}><IoMdRedo /></button>
                            {
                                crop &&
                                <button className='crop' onClick={handleCrop}>Crop Image</button>
                            }
                            <label htmlFor="choose">Choose Image</label>
                            <input onChange={imageHandle} type="file" id='choose' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
