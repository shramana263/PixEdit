import React from 'react'
import './style/home.scss'
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr'
import { CgMergeHorizontal, CgMergeVertical } from 'react-icons/cg'
import { IoIosImage, IoMdRedo, IoMdUndo } from 'react-icons/io'

const Home = () => {
    const filterElement=[
        {
            name: 'Brightness',

        },
        {
            name: 'Grayscale',

        },
        {
            name: 'Sepia',

        },
        {
            name: 'Saturate',

        },
        {
            name: 'Contrast',

        },
        {
            name: 'HueRotate',

        },
    ]
    return (
        <div className='image_editor'>
            <div className="card">
                <div className="card_header">
                    <h2> ---- Image Editor ----   </h2>
                </div>
                <div className="card_body">
                    <div className="sidebar">
                        <div className="side_body">
                            <div className="filter_section">
                                <span>Filters</span>
                                <div className="filter_key">
                                    {
                                        filterElement && filterElement.map((item, index)=>(
                                            <button key={index}>{item.name}</button>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="filter_slider">
                                <div className="label_bar">
                                    <label htmlFor="range">Rotate</label>
                                    <span>100%</span>
                                </div>
                                <input type="range" />
                            </div>
                            <div className="rotate">
                                <label htmlFor="">Rotate & Flip</label>
                                <div className="icon">
                                    <div><GrRotateLeft/></div>
                                    <div><GrRotateRight/></div>
                                    <div><CgMergeVertical/></div>
                                    <div><CgMergeHorizontal/></div>
                                </div>
                            </div>
                        </div>

                        <div className="reset">
                            <button>Reset</button>
                            <button className='save'>Save Image</button>
                        </div>
                    </div>

                    <div className="image_section">
                        <div className="image">
                            <label htmlFor="choose">
                                <IoIosImage/>
                                <span>Choose Image</span>
                            </label>
                        </div>
                        <div className="image_select">
                            <button className='undo'><IoMdUndo/></button>
                            <button className='redo'><IoMdRedo/></button>
                            <button className='crop'>Crop Image</button>
                            <label htmlFor="choose">Choose Image</label>
                            <input type="file" id='choose'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
