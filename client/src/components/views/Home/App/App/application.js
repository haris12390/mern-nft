import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import Accordion from 'react-bootstrap/Accordion'
import UploadIcon from '../../../../../images/upload-icon.png'
import './application.css'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import useAuth from 'src/hooks/useAuth';

export default function Application() {
    const defaultId = uuidv4()
    const [inputFields, setInputFields] = useState([
        {
            id: defaultId, LayerName: 'Background', images: []
        }
    ]);

    const { user } = useAuth()

    console.log(user)


    const [previewImage, setPreviewImage] = useState('')
    const [selectedLayer, setSelectedLayer] = useState({
        id: defaultId, LayerName: 'Background', images: []
    })

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    // const [noOfImages , setnoOfImages] = useState('')


    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map((i) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value;
            }
            return i;
        });

        setInputFields(newInputFields);
    };
    const handleRemoveFields = (id) => {
        const values = [...inputFields];
        values.splice(
            values.findIndex((val) => val.id === id),
            1
        );
        setInputFields(values);
    };

    useEffect(() => {
        if (acceptedFiles.length == 0) return
        // console.log(acceptedFiles.length, 'runningggggggggggggggggggggg')


        const selected = { ...selectedLayer }
        let arr = [...inputFields]
        let obj = [...acceptedFiles]
        const selectedIndex = arr.findIndex(x => x.id == selected.id)
        obj.forEach((file, i) => {
            // console.log(i, 'ffffffffffffff')
            const fileObj = { img: file, rarity: 100, name: file.name, userId: user?._id }
            selectedLayer.images.push(fileObj)
            // arr[selectedIndex].images.push(fileObj)
        })
        if (selected == selectedLayer && arr == inputFields) return
        setSelectedLayer(selected)
        // setInputFields(arr)

        // acceptedFiles.forEach((file, index) => {
        //     obj.push(file)
        //     inputFields.map((img, i) => {
        //         arr[i].images?.push(obj)
        //     })

        // })


        // let arr = [...inputFields]
        // acceptedFiles.map((img, i) => {
        //     for (let j = 0; i < arr.length; i++) {

        //         return arr[j].images?.push(img)
        //     }
        //     return arr
        // })
        // console.log(arr, "ARRAAYYYY")
        // setInputFields(arr)
    }, [acceptedFiles])


    const handleAddFields = () => {
        setInputFields([
            ...inputFields,
            {
                id: uuidv4(), LayerName: 'New Layer', images: []
            }

        ]);
    };

    function capitalizeWords(string) {
        return (string.toUpperCase())
    };


    const generateNFTHandler = async () => {
        console.log(inputFields, "Generate Handler")
        let newData = new FormData()

        inputFields.forEach((inputField) => {
            for (let i = 0; i < inputField.images.length; i++) {
                console.log(inputField.images[i].img.userID = user?._id)
                // inputField.images[i].img.userID.assign("userId", user?._id)
                // Object.assign(inputField.images[i].img, { userId: user?._id }) 

                // Ye hai last line of code jiski details neeche likhin hain 

                newData.append(`${inputField.LayerName}`, inputField.images[i].img)
            }
        })


        // User id se folder banana hai is waqt jo layers send kar rhay hain usky folders ban rahy hain 
        // images k object mein user id push karani hai as a key phir us key se hum dynamic folders create karenge Server ki "Layers "
        // wale folder k andar 

        // Sigining off its 29 nov 2021 Haris Ghrori

        // console.log(newData, "NEW DATA")

        if (!newData) return

        const { data } = await axios.post(`${process.env.REACT_APP_PORT}/generate`, newData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(data)
    }


    return (
        <div className="container-fluid application-wrapper my-1">
            <div className="row">
                <div className="col-md-4" style={{ backgroundColor: "#ececec" }}>
                    <div >
                        <div className="mt-5 ps-2">
                            <h4>Layers</h4>
                        </div>

                        {inputFields?.map((inputField, i) => {

                            return (

                                <div key={inputField.id} onClick={() => setSelectedLayer(inputField)} style={{ marginBottom: "10px" }}>

                                    <Accordion  >
                                        <Accordion.Item eventKey={i} >
                                            <Accordion.Header className="" >
                                                <div className="d-flex w-100">
                                                    <div className="mt-2">
                                                        {capitalizeWords(inputField?.LayerName)}
                                                    </div>
                                                    <div className="ms-auto bg-light  rounded-pill">
                                                        <button disabled={inputFields.length === 1} className="btn" onClick={() => handleRemoveFields(inputField.id)}><i class="fa fa-trash" aria-hidden="true" style={{ color: '#0b7bd5' }}></i></button>
                                                    </div>
                                                    <div className="bg-light p-2 m-1">
                                                        {inputField.images.length}
                                                    </div>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body style={{ backgroundColor: "#e2e2e2" }}>
                                                {inputField.images.map((img) => {
                                                    if (!img.name) return
                                                    return (
                                                        <>
                                                            <div className="d-flex ">
                                                                {img.name}
                                                                <div style={{ minWidth: '150px', width: '150px' }} className="ms-auto d-flex justify-content-end">
                                                                    <div className="input-group">
                                                                        <span className="input-group-append">
                                                                            <button className="btn btn-outline-secondary bg-white border-end-0 border-bottom-0 border ms-n5" type="button">
                                                                                <i className="fa fa-angle-up"></i>
                                                                            </button>
                                                                        </span>
                                                                        <input value="100%" className="form-control border-end-0 border" type="text" id="example-search-input" />
                                                                        <span className="input-group-append">
                                                                            <button className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
                                                                                <i className="fa fa-angle-down"></i>
                                                                            </button>
                                                                        </span>
                                                                    </div>

                                                                </div>
                                                                <div className="ms-auto bg-light rounded-pill">
                                                                    <button className="btn" onClick={() => handleRemoveFields(inputField.id)}><i class="fa fa-edit" style={{ color: '#0b7bd5' }}></i>
                                                                    </button>
                                                                </div>
                                                                &nbsp;
                                                                <div className="bg-light rounded-pill">
                                                                    <button className="btn" onClick={() => handleRemoveFields(inputField.id)}><i class="fa fa-trash" style={{ color: '#0b7bd5' }}></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </>
                                                    )
                                                })}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>

                                    {/* <div className="mb-4 w-100  ">
                                    <input name="questions" type="text" className="form-control sign-up-inputs w-100" onChange={(event) =>
                                        handleChangeInput(inputField.id, event)
                                    } value={inputField.questions} placeholder="Enter Questions" />
                                </div>
                                <div className="mb-4 w-100  ">
                                    <input value={inputField.answers} name="answers" type="text" className="form-control sign-up-inputs w-100" onChange={(event) =>
                                        handleChangeInput(inputField.id, event)
                                    } placeholder="Enter Answers" />
                                </div>
                                <div className="d-flex  text-right ms-auto">
                                    &nbsp;
                                    <button className="btn btn-danger" disabled={inputFields.length === 1}
                                        onClick={() =>
                                            handleRemoveFields(inputField.id)
                                        }>DELETE</button>
                                </div> */}
                                </div>
                            )
                        })}
                        <div className="input-group" >
                            <input style={{ outlineColor: "black" }} value={selectedLayer.LayerName} onChange={(event) => {
                                handleChangeInput(selectedLayer.id, event)
                            }
                            } name="LayerName" className="form-control border-end-0 border" type="search" id="example-search-input" placeholder="Rename Layer" />
                            <span className="input-group-append">
                                <button onClick={handleAddFields} className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
                                    <i className="fa fa-plus-circle fa-2x" style={{ color: '#f9689f', width: "70px" }}></i>
                                </button>
                            </span>
                        </div>
                        <div className="text-center p-4">
                            <button className="btn text-white rounded-pill" onClick={generateNFTHandler} style={{ backgroundColor: "#ff7faf" }}>GENERATE & PREVIEW</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 p-5">
                    <div className="container ">
                        <div className="d-flex">
                            <div className='p-1 w-25 text-center' style={{ backgroundColor: "#ececec" }}>
                                <span>
                                    Layer : {selectedLayer.LayerName}
                                </span>
                            </div>
                            <div className="text-center p-1 w-25" style={{ backgroundColor: "#ececec" }}>
                                <span>
                                    {selectedLayer.images.length} Image(s)
                                </span>
                            </div>
                        </div>
                        <div className="d-flex flex-column ">
                            <div className="border row m-0  container p-3">
                                {selectedLayer.images.map((file, i) => {
                                    if (!file.img) return
                                    return (

                                        <img key={i} className="image-row border m-1" onClick={() => setPreviewImage(URL.createObjectURL(file.img))} src={URL.createObjectURL(file.img)} alt='nft' style={{ width: "85px", height: "100px", objectFit: 'contain' }} />
                                    )
                                }
                                )}
                            </div>
                            <div className="mt-2">
                                <section className="text-center p-3" style={{ backgroundColor: '#f0f2f4' }}>
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <img src={UploadIcon} alt="upload" />
                                        <input {...getInputProps()} />
                                        <h3 className="bolder-font">Click or drop images here!</h3>
                                        <small>(PNG, JPEG, GIF, MAX Size - 10MB)</small>
                                    </div>
                                </section>
                            </div>
                            <div className="mt-2" style={{ width: "100%", height: "345px", backgroundColor: '#c6ccd2' }}>
                                <div className="container"  >
                                    <div className="text-center ">
                                        {/* <img src={Example} className="mt-3" alt="preview" /> */}
                                        {previewImage &&
                                            <img style={{ width: "406px", height: '315px' }} src={previewImage} className="mt-3" alt="preview" />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
