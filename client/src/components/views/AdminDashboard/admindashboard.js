import React, { useEffect, useState } from "react";
import './adminDashboard.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import { Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaCartPlus, FaColumns, FaWindowMaximize, FaLaptop, FaBookOpen, FaCommentAlt, FaQuestion, FaDesktop, FaHome } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi'
import { Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router';
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'


class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    // Starts the upload process.
    upload() {
        return this.loader.file
            .then(async (file) => {

                let data = new FormData()

                data.append("file", file)
                data.append("upload_preset", "nft-mern")

                const res = await axios.post("https://api.cloudinary.com/v1_1/drlc5d15r/image/upload", data)

                console.log(res)
                if (res?.data?.url) {
                    return ({
                        default: res.data.url
                    }
                    )
                }
                return null
            })
    }
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter(loader);
    };
}



// main pages



export default function Sidebar() {
    const [collapser, setCollapser] = useState();
    const [toggler, settoggler] = useState(false);
    const history = useHistory()
    const [open, setOpen] = React.useState(false);
    const [featuredImage, setFeaturedImage] = useState('')
    const [blogTitle, setBlogTitle] = useState('')
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    let newDate = month + '-' + day + '-' + year
    var finalDate = new Date(newDate)
    var finalMonth = finalDate.toLocaleString('default', { month: 'long' });
    let finalDisplayDate = finalMonth + ' ' + day + ', ' + year
    // const { state, dispatch } = useContext(GlobalContext)

    const handleLogout = () => {
        localStorage.removeItem("authtoken")
        history.push('/login')
        window.location.reload()
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [state, setState] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        getLayout()
    }, [])

    const getLayout = async () => {
        axios.get(`${process.env.REACT_APP_PORT}/api/layout/getLayout`).then(res => {
            console.log(res.data, 'res')
            if (res) {
                setState(res.data.layout?.Layout)
                setId(res.data?.layout._id)
                setInputFields(res.data.layout?.Layout?.FAQ?.section2)
            }

        })
    }

    console.log(state, 'State')


    const SaveImage = async (image) => {
        console.log(image, "ooper ")
        let data = new FormData()

        data.append("file", image)
        data.append("upload_preset", "nft-mern")
        // data.append("upload_preset" , "drlc5d15r")
        // data.append("")

        console.log(data, 'DATAAAAAA')

        const res = await axios.post("https://api.cloudinary.com/v1_1/drlc5d15r/image/upload", data)

        if (res?.data?.url) return res.data.url
        return null


    }

    const [Final, setFinal] = useState('')
    const getEditorValues = (event, editor) => {
        const data = editor.getData();
        console.log(data)
        setFinal(data)
    }


    const changeLayoutHandler = async (e, fieldName, layoutName) => {
        e.preventDefault()
        let sectionObject
        let layoutObject
        if (layoutName === "Home") {
            layoutObject = "Home"
            const { header, section1, section2, section3, section4, section5, section6, section7, footer } = state.Home
            // return console.log(section1, "SECTION")
            if (fieldName === 'header') {
                if (!header.image) sectionObject = header
                if (typeof header.image === "object") {
                    const url = await SaveImage(header.image)
                    header.image = url
                }
                sectionObject = header
            }
            if (fieldName === 'section1') {
                if (!section1.image) sectionObject = section1
                if (typeof section1.image === "object") {
                    const url = await SaveImage(section1.image)
                    section1.image = url
                }
                sectionObject = section1
            }
            if (fieldName === 'section2') {
                if (!section2.image1 && !section2.image2) sectionObject = section2
                if (typeof section2.image1 === "object") {
                    const url = await SaveImage(section2.image1)
                    section2.image1 = url
                }
                if (typeof section2.image2 === "object") {
                    const url2 = await SaveImage(section2.image2)
                    section2.image2 = url2
                }
                sectionObject = section2
            }
            if (fieldName === 'section3') sectionObject = section3
            if (fieldName === 'section4') sectionObject = section4
            if (fieldName === 'section5') {
                if (!section5.image) sectionObject = section5
                if (typeof section5.image === "object") {
                    const url = await SaveImage(section5.image)
                    section5.image = url
                }
                sectionObject = section5
            }
            if (fieldName === 'section6') sectionObject = section6
            if (fieldName === 'section7') {
                if (!section7.listImages) sectionObject = section7
                if (typeof section7.listImages === "object") {
                    const url = await SaveImage(section7.listImages)
                    section7.listImages = url
                    sectionObject = section7
                }
            }
            if (fieldName === 'footer') {
                if (!footer.image) sectionObject = footer
                if (typeof footer.image === "object") {
                    const url = await SaveImage(footer.image)
                    footer.image = url
                }
                sectionObject = footer
            }
        }
        if (layoutName === "About") {
            layoutObject = "About"
            const { header, section1, section2, section3, footer } = state.About
            // console.log(header, section1, section2, section3, footer)
            if (fieldName === 'header') {
                if (!header.image) sectionObject = header
                if (typeof header.image === "object") {
                    const url = await SaveImage(header.image)
                    header.image = url
                }
                sectionObject = header
            }
            if (fieldName === 'section1') {
                sectionObject = section1
            }
            if (fieldName === 'section2') {
                if (!section2.leftImage) sectionObject = section2
                if (typeof section2.leftImage === "object") {
                    const url = await SaveImage(section2.leftImage)
                    section2.leftImage = url
                }
                sectionObject = section2
            }
            if (fieldName === 'section3') {
                if (!section3.image) sectionObject = section3
                if (typeof section3.image === "object") {
                    const url = await SaveImage(section3.image)
                    section3.image = url
                }
                sectionObject = section3
            }
            if (fieldName === 'footer') {
                if (!footer.image) sectionObject = footer
                if (typeof footer.image === "object") {
                    const url = await SaveImage(footer.image)
                    footer.image = url
                }
                sectionObject = footer
            }
        }
        if (layoutName === "Contact") {
            layoutObject = "Contact"
            const { header, section1, section2, footer } = state.Contact
            // return console.log(header, section1, section2, footer)
            if (fieldName === 'header') {
                if (!header.image) sectionObject = header
                if (typeof header.image === "object") {
                    const url = await SaveImage(header.image)
                    header.image = url
                }
                sectionObject = header
            }
            if (fieldName === 'section1') {
                sectionObject = section1
            }
            if (fieldName === 'section2') {
                sectionObject = section2
            }
            if (fieldName === 'footer') {
                if (!footer.image) sectionObject = footer
                if (typeof footer.image === "object") {
                    const url = await SaveImage(footer.image)
                    footer.image = url
                }
                sectionObject = footer
            }
        }
        if (layoutName === "FAQ") {
            layoutObject = "FAQ"
            let { header, section1, section2, footer } = state.FAQ
            section2 = inputFields
            if (fieldName === 'header') {
                if (!header.image) sectionObject = header
                if (typeof header.image === "object") {
                    const url = await SaveImage(header.image)
                    header.image = url
                }
                sectionObject = header
            }
            if (fieldName === "section1") sectionObject = section1

            if (fieldName === "section2") sectionObject = section2

            if (fieldName === 'footer') {
                if (!footer.image) sectionObject = footer
                if (typeof footer.image === "object") {
                    const url = await SaveImage(footer.image)
                    footer.image = url
                }
                sectionObject = footer
            }
        }

        if (layoutName === "Blog") {
            layoutObject = "Blog"
            let { header, section1, section2, footer } = state.Blog
            if (fieldName === 'header') {
                if (!header.image) sectionObject = header
                if (typeof header.image === "object") {
                    const url = await SaveImage(header.image)
                    header.image = url
                }
                sectionObject = header
            }
            if (fieldName === 'section1') {
                sectionObject = section1
            }

            if (fieldName === 'section2') {
                let object = {
                    id: uuidv4(),
                    blogTitle: blogTitle,
                    blogText: Final,
                    createdBy: '@Admin',
                    createdAt: finalDisplayDate,
                    category: 'Artwork'
                }

                if (typeof featuredImage === "object") {
                    const url = await SaveImage(featuredImage)
                    object.featuredImage = url
                }

                section2 = [...state.Blog.section2]

                section2.push(object)
                console.log(section2)

                sectionObject = section2

                // if (!section2.featuredImage) sectionObject = section2
                // if (typeof section2.featuredImage === "object") {
                //     let url = await SaveImage(section2.featuredImage)
                //     section2.featuredImage = url
                // }

                // section2.id = uuidv4()
                // section2.blogText = Final
                // let object = {
                //     id: uuidv4,
                //     featuredImage: section2.featuredImage,
                //     blogText: Final
                // }
                // section2.push(object)
                // sectionObject = section2
            }

            if (fieldName === 'footer') {
                if (!footer.image) sectionObject = footer
                if (typeof footer.image === "object") {
                    const url = await SaveImage(footer.image)
                    footer.image = url
                }
                sectionObject = footer
            }

        }

        axios.post(`${process.env.REACT_APP_PORT}/api/layout/update`, { sectionObject, id, fieldName, layoutObject }).then(res => {
            if (res) {
                handleClick()
            }
        })
    }

    // Addable Inputs

    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), questions: "", answers: "" },
    ]);

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
    const handleAddFields = () => {
        setInputFields([
            ...inputFields,
            { id: uuidv4(), questions: "", answers: "" },
        ]);
    };


    return (
        <Router>
            <div className="d-flex" style={{ minHeight: "100vh" }}>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Changes made successfully"
                />
                <div>
                    {/* <ProSidebar toggled={toggler} collapsed={collapser} image={Bcf} breakPoint="lg" > */}
                    <ProSidebar toggled={toggler} collapsed={collapser} breakPoint="lg" >
                        <SidebarHeader>
                            <Menu>
                                <MenuItem onClick={() => setCollapser(!collapser)} icon={<FaCartPlus size="3x" />}>
                                    {/* <MenuItem onClick={() => setCollapser(!collapser)} > */}
                                    <p style={{ fontSize: "20px", marginTop: "10px" }}>NFT Generator</p>
                                </MenuItem>
                            </Menu>

                        </SidebarHeader>
                        <Menu iconShape="circle">
                            <SubMenu icon={<FaDesktop />} title="Website Layout">

                                <MenuItem icon={<FaWindowMaximize />} ><Link to="'/dashboard/header">Header</Link></MenuItem>
                                <MenuItem icon={<FaColumns />} ><Link to="/dashboard/footer">Footer</Link></MenuItem>
                                <SubMenu icon={<FaHome />} title="Home">
                                    <MenuItem ><Link to='/dashboard/home/section1'>Section 1</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/home/section2'>Section 2</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/home/section3'>Section 3</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/home/section4'>Section 4</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/home/section5'>Section 5</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/home/section6'>Section 6</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/home/section7'>Section 7</Link></MenuItem>
                                </SubMenu>
                                <SubMenu icon={<FaBookOpen />} title="About Us">
                                    <MenuItem ><Link to='/dashboard/about/section1'>Section 1</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/about/section2'>Section 2</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/about/section3'>Section 3</Link></MenuItem>
                                </SubMenu>
                                <SubMenu icon={<FaCommentAlt />} title="Contact Us">
                                    <MenuItem ><Link to='/dashboard/contact/section1'>Section 1</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/contact/section2'>Section 2</Link></MenuItem>
                                </SubMenu>
                                <SubMenu icon={<FaQuestion />} title="FAQ'S">
                                    <MenuItem ><Link to='/dashboard/faq/section1'>Section 1</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/faq/section2'>Section 2</Link></MenuItem>
                                </SubMenu>
                                <SubMenu icon={<FaLaptop />} title="BLOG">
                                    <MenuItem ><Link to='/dashboard/blog/section1'>Section 1</Link></MenuItem>
                                    <MenuItem ><Link to='/dashboard/blog/section2'>Section 2</Link></MenuItem>
                                </SubMenu>
                            </SubMenu>
                            <MenuItem >Welcome Admin<Link /></MenuItem>
                            <MenuItem onClick={() => { handleLogout() }} icon={<HiLogout />}>Logout<Link /></MenuItem>
                            <MenuItem >

                            </MenuItem>
                        </Menu>
                        <div className="d-flex justify-content-center">
                            <Button className="bgggs" variant="dark" onClick={() => settoggler(!toggler)}></Button >
                        </div>
                        <SidebarFooter>
                        </SidebarFooter>
                    </ProSidebar>
                </div>
                <Switch>
                    <div className="w-100 switch-div p-2" style={{ backgroundColor: "rgb(0,0,0,0.2)" }}>
                        <Paper className="section-paper" evaluation={3}>
                            <h1>Dashboard</h1>
                            {/* <Route path='/dashboard/header'>
                                <div className="text-center">
                                    <h1 >Header</h1>
                                </div>
                                <form onSubmit={(e) => changeLayoutHandler(e, "header", "Header")}>
                                    <div className="form-group">
                                        <div className="mb-4 w-100  ">
                                            <label>Header Logo :</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Home: {
                                                    ...prevState.Home,
                                                    header: {
                                                        ...prevState.Home.header,
                                                        image: e.target.files[0]
                                                    }
                                                }
                                            }))} type="file" className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4">
                                            <label>List Item 1 :</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Home: {
                                                    ...prevState.Home,
                                                    header: {
                                                        ...prevState.Home.header,
                                                        listItem1: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state.Home?.header.listItem1} required className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4">
                                            <label>List Item 2 :</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Home: {
                                                    ...prevState.Home,
                                                    header: {
                                                        ...prevState.Home.header,
                                                        listItem2: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state.Home?.header.listItem2} required className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4">
                                            <label>List Item 3 :</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Home: {
                                                    ...prevState.Home,
                                                    header: {
                                                        ...prevState.Home.header,
                                                        listItem3: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state.Home?.header.listItem3} required className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4">
                                            <label>List Item 4 :</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Home: {
                                                    ...prevState.Home,
                                                    header: {
                                                        ...prevState.Home.header,
                                                        listItem4: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state.Home?.header.listItem4} required className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4">
                                            <label>List Item 5 :</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Home: {
                                                    ...prevState.Home,
                                                    header: {
                                                        ...prevState.Home.header,
                                                        listItem5: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state.Home?.header.listItem5} required className="form-control login-inputs w-100 " />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Change</button>
                                </form>
                            </Route> */}
                            <Route exact path='/dashboard/home/section1'>
                                <div className="container-fluid">
                                    <div className="text-center">
                                        <h1 >Section 1</h1>
                                    </div>
                                    <form onSubmit={(e) => changeLayoutHandler(e, "section1", "Home")}>
                                        <div className="form-group">
                                            <div className="mb-4   ">
                                                <label>Heading :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section1: {
                                                            ...prevState.Home.section1,
                                                            heading: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section1.heading} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4 w-100  ">
                                                <label>Text :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section1: {
                                                            ...prevState.Home.section1,
                                                            text: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section1.text} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4 w-100  ">
                                                <label>Button Text :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section1: {
                                                            ...prevState.Home.section1,
                                                            buttonText: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section1.buttonText} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4 w-100  ">
                                                <label>Image :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section1: {
                                                            ...prevState.Home.section1,
                                                            image: e.target.files[0]
                                                        }
                                                    }
                                                }))} type="file" className="form-control login-inputs w-100 " />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Change</button>
                                    </form>
                                </div>
                            </Route>
                            <Route exact path='/dashboard/home/section2'>
                                <div className="container-fluid">
                                    <div className="text-center">
                                        <h1 >Section 2</h1>
                                    </div>
                                    <form onSubmit={(e) => changeLayoutHandler(e, "section2", "Home")}>
                                        <div className="form-group">
                                            <div className="mb-4">
                                                <label>Heading :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section2: {
                                                            ...prevState.Home.section2,
                                                            heading: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section2.heading} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>Background Color :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section2: {
                                                            ...prevState.Home.section2,
                                                            bgColor: e.target.value
                                                        }
                                                    }
                                                }))} type="color" value={state.Home?.section2?.bgColor} required className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4 w-10">
                                                <label>Left Image</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section2: {
                                                            ...prevState.Home.section2,
                                                            image1: e.target.files[0]
                                                        }
                                                    }
                                                }))} type="file" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4 w-10">
                                                <label>Right Image</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section2: {
                                                            ...prevState.Home.section2,
                                                            image2: e.target.files[0]
                                                        }
                                                    }
                                                }))} type="file" className="form-control login-inputs w-100 " />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Change</button>
                                    </form>
                                </div>
                            </Route>
                            <Route exact path='/dashboard/home/section3'>
                                <div className="container-fluid">
                                    <div className="text-center">
                                        <h1 >Section 3</h1>
                                    </div>
                                    <form onSubmit={(e) => changeLayoutHandler(e, 'section3', "Home")}>
                                        <div className="form-group">
                                            <div className="mb-4   ">
                                                <label>Heading :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section3: {
                                                            ...prevState.Home.section3,
                                                            heading: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section3.heading} required type="text" className="form-control login-inputs w-100 " />
                                            </div>

                                            <div className="mb-4   ">
                                                <label>NFT Limit</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section3: {
                                                            ...prevState.Home.section3,
                                                            NFTLimit: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section3?.NFTLimit} required type="text" className="form-control login-inputs w-100 " />
                                            </div>

                                        </div>
                                        <button type="submit" className="btn btn-primary">Change</button>
                                    </form>
                                </div>
                            </Route>
                            <Route exact path='/dashboard/home/section4'>
                                <div className="container-fluid">
                                    <div className="text-center">
                                        <h1 >Section 4</h1>
                                    </div>
                                    <form onSubmit={(e) => changeLayoutHandler(e, 'section4', "Home")}>
                                        <div className="form-group">
                                            <div className="mb-4   ">
                                                <label>Heading :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section4: {
                                                            ...prevState.Home.section4,
                                                            heading: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section4.heading} required type="text" className="form-control login-inputs w-100 " />
                                            </div>

                                            <div className="mb-4">
                                                <label>Text :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section4: {
                                                            ...prevState.Home.section4,
                                                            text: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section4.text} required type="text" className="form-control login-inputs w-100 " />
                                            </div>

                                        </div>
                                        <button type="submit" className="btn btn-primary">Change</button>
                                    </form>
                                </div>
                            </Route>
                            <Route exact path='/dashboard/home/section5'>
                                <div className="container-fluid">
                                    <div className="text-center">
                                        <h1 >Section 5</h1>
                                    </div>
                                    <form onSubmit={(e) => changeLayoutHandler(e, 'section5', "Home")}>
                                        <div className="form-group">
                                            <div className="mb-4   ">
                                                <label>Heading :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section5: {
                                                            ...prevState.Home.section5,
                                                            heading: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section5.heading} required type="text" className="form-control login-inputs w-100 " />
                                            </div>

                                            <div className="mb-4">
                                                <label>Text :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section5: {
                                                            ...prevState.Home.section5,
                                                            text: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section5.text} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>Button Text :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section5: {
                                                            ...prevState.Home.section5,
                                                            buttonText: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section5.buttonText} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>Background Color :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section5: {
                                                            ...prevState.Home.section5,
                                                            bgColor: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section5.bgColor} required type="color" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>Image :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section5: {
                                                            ...prevState.Home.section5,
                                                            image: e.target.files[0]
                                                        }
                                                    }
                                                }))} type="file" className="form-control login-inputs w-100 " />
                                            </div>

                                        </div>
                                        <button type="submit" className="btn btn-primary">Change</button>
                                    </form>
                                </div>
                            </Route>
                            <Route exact path='/dashboard/home/section6'>
                                <div className="container-fluid">
                                    <div className="text-center">
                                        <h1 >Section 6</h1>
                                    </div>
                                    <form onSubmit={(e) => changeLayoutHandler(e, 'section6', "Home")}>
                                        <div className="form-group">
                                            <div className="mb-4   ">
                                                <label>Heading :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section6: {
                                                            ...prevState.Home.section6,
                                                            heading: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section6.heading} required type="text" className="form-control login-inputs w-100 " />
                                            </div>

                                            <div className="mb-4">
                                                <label>Text :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section6: {
                                                            ...prevState.Home.section6,
                                                            text: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section6.text} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>Background Color :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section6: {
                                                            ...prevState.Home.section6,
                                                            bgColor: e.target.value
                                                        }
                                                    }
                                                }))} type="color" value={state.Home?.section6.bgColor} required className="form-control login-inputs w-100 " />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Change</button>
                                    </form>
                                </div>
                            </Route>
                            <Route exact path='/dashboard/home/section7'>
                                <div className="container-fluid">
                                    <div className="text-center">
                                        <h1 >Section 7</h1>
                                    </div>
                                    <form onSubmit={(e) => changeLayoutHandler(e, 'section7', "Home")}>
                                        <div className="form-group">
                                            <div className="mb-4   ">
                                                <label>Heading :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section7: {
                                                            ...prevState.Home.section7,
                                                            heading: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section7.heading} required type="text" className="form-control login-inputs w-100 " />
                                            </div>

                                            <div className="mb-4">
                                                <label>List Heading 1</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section7: {
                                                            ...prevState.Home.section7,
                                                            listHead: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section7.listHead} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>List Text 1:</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section7: {
                                                            ...prevState.Home.section7,
                                                            listText: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section7.listText} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>List Heading 2</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section7: {
                                                            ...prevState.Home.section7,
                                                            listHead2: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section7.listHead} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>List Text 2:</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section7: {
                                                            ...prevState.Home.section7,
                                                            listText2: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section7.listText2} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>List Heading 3</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section7: {
                                                            ...prevState.Home.section7,
                                                            listHead3: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section7.listHead2} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>List Text 3:</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section7: {
                                                            ...prevState.Home.section7,
                                                            listText3: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section7.listText3} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>List Heading 4</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section7: {
                                                            ...prevState.Home.section7,
                                                            listHead4: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section7.listHead3} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>List Text 4:</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section7: {
                                                            ...prevState.Home.section7,
                                                            listText4: e.target.value
                                                        }
                                                    }
                                                }))} value={state.Home?.section7.listText4} required type="text" className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4">
                                                <label>Image :</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Home: {
                                                        ...prevState.Home,
                                                        section7: {
                                                            ...prevState.Home.section7,
                                                            listImages: e.target.files[0]
                                                        }
                                                    }
                                                }))} type="file" className="form-control login-inputs w-100 " />
                                            </div>

                                        </div>
                                        <button type="submit" className="btn btn-primary">Change</button>
                                    </form>
                                </div>
                            </Route>

                            {/* About Us  */}
                            <Route exact path='/dashboard/about/section1'>
                                <div className="text-center">
                                    <h1 >Section 1</h1>
                                </div>
                                <form onSubmit={(e) => changeLayoutHandler(e, "section1", "About")}>
                                    <div className="form-group">
                                        <div className="mb-4 w-100  ">
                                            <label>Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, About: {
                                                    ...prevState.About,
                                                    section1: {
                                                        ...prevState.About.section1,
                                                        heading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.About?.section1?.heading} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Left Sub Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, About: {
                                                    ...prevState.About,
                                                    section1: {
                                                        ...prevState.About.section1,
                                                        leftSubHeading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.About?.section1?.leftSubHeading} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Right Sub Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, About: {
                                                    ...prevState.About,
                                                    section1: {
                                                        ...prevState.About.section1,
                                                        rightSubHeading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.About?.section1?.rightSubHeading} className="form-control login-inputs w-100 " />
                                        </div>

                                    </div>
                                    <button type="submit" className="btn btn-primary">Change</button>
                                </form>
                            </Route>
                            <Route exact path='/dashboard/about/section2'>
                                <div className="text-center">
                                    <h1 >Section 2</h1>
                                </div>
                                <form onSubmit={(e) => changeLayoutHandler(e, "section2", "About")}>
                                    <div className="form-group">
                                        <div className="mb-4 w-100  ">
                                            <label>Left Image</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, About: {
                                                    ...prevState.About,
                                                    section2: {
                                                        ...prevState.About.section2,
                                                        leftImage: e.target.files[0]
                                                    }
                                                }
                                            }))} type="file" className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Right Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, About: {
                                                    ...prevState.About,
                                                    section2: {
                                                        ...prevState.About.section2,
                                                        rightHeading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.About?.section2?.rightHeading} className="form-control login-inputs w-100 " />
                                        </div>

                                        <div className="mb-4 w-100  ">
                                            <label>Text</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, About: {
                                                    ...prevState.About,
                                                    section2: {
                                                        ...prevState.About.section2,
                                                        text: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.About?.section2?.text} className="form-control login-inputs w-100 " />
                                        </div>

                                    </div>
                                    <button type="submit" className="btn btn-primary">Change</button>
                                </form>
                            </Route>
                            <Route exact path='/dashboard/about/section3'>
                                <div className="text-center">
                                    <h1 >Section 3</h1>
                                </div>
                                <form onSubmit={(e) => changeLayoutHandler(e, "section3", "About")}>
                                    <div className="form-group">
                                        <div className="mb-4 w-100  ">
                                            <label>Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, About: {
                                                    ...prevState.About,
                                                    section3: {
                                                        ...prevState.About.section3,
                                                        heading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.About?.section3.heading} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Text</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, About: {
                                                    ...prevState.About,
                                                    section3: {
                                                        ...prevState.About.section3,
                                                        text: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.About?.section3?.text} className="form-control login-inputs w-100 " />
                                        </div>

                                        <div className="mb-4 w-100  ">
                                            <label>Left Image</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, About: {
                                                    ...prevState.About,
                                                    section3: {
                                                        ...prevState.About.section3,
                                                        image: e.target.files[0]
                                                    }
                                                }
                                            }))} type="file" className="form-control login-inputs w-100 " />
                                        </div>

                                        <div className="mb-4 w-100  ">
                                            <label>Button Text</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, About: {
                                                    ...prevState.About,
                                                    section3: {
                                                        ...prevState.About.section3,
                                                        buttonText: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.About?.section3?.buttonText} className="form-control login-inputs w-100 " />
                                        </div>

                                    </div>
                                    <button type="submit" className="btn btn-primary">Change</button>
                                </form>
                            </Route>
                            {/* Contact Us */}
                            <Route exact path='/dashboard/contact/section1'>
                                <div className="text-center">
                                    <h1 >Section 1</h1>
                                </div>
                                <form onSubmit={(e) => changeLayoutHandler(e, "section1", "Contact")}>
                                    <div className="form-group">
                                        <div className="mb-4 w-100  ">
                                            <label>Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Contact: {
                                                    ...prevState.Contact,
                                                    section1: {
                                                        ...prevState.Contact.section1,
                                                        heading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.Contact?.section1?.heading} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Left Sub Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Contact: {
                                                    ...prevState.Contact,
                                                    section1: {
                                                        ...prevState.Contact.section1,
                                                        leftSubHeading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.Contact?.section1?.leftSubHeading} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Right Sub Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Contact: {
                                                    ...prevState.Contact,
                                                    section1: {
                                                        ...prevState.Contact.section1,
                                                        rightSubHeading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.Contact?.section1?.rightSubHeading} className="form-control login-inputs w-100 " />
                                        </div>

                                    </div>
                                    <button type="submit" className="btn btn-primary">Change</button>
                                </form>
                            </Route>
                            <Route exact path='/dashboard/contact/section2'>
                                <div className="text-center">
                                    <h1 >Section 2</h1>
                                </div>
                                <form onSubmit={(e) => changeLayoutHandler(e, "section2", "Contact")}>
                                    <div className="form-group">
                                        <div className="mb-4 w-100  ">
                                            <label>Left Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Contact: {
                                                    ...prevState.Contact,
                                                    section2: {
                                                        ...prevState.Contact.section2,
                                                        leftheading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.Contact?.section2?.leftheading} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Right Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Contact: {
                                                    ...prevState.Contact,
                                                    section2: {
                                                        ...prevState.Contact.section2,
                                                        rightheading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.Contact?.section2?.rightheading} className="form-control login-inputs w-100 " />
                                        </div>

                                        <div className="mb-4 w-100  ">
                                            <label>Text</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Contact: {
                                                    ...prevState.Contact,
                                                    section2: {
                                                        ...prevState.Contact.section2,
                                                        text: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.Contact?.section2?.text} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Address Text</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Contact: {
                                                    ...prevState.Contact,
                                                    section2: {
                                                        ...prevState.Contact.section2,
                                                        addressText: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.Contact?.section2?.addressText} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Mailing Text</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Contact: {
                                                    ...prevState.Contact,
                                                    section2: {
                                                        ...prevState.Contact.section2,
                                                        mailText: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.Contact?.section2?.mailText} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Telephone Text</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Contact: {
                                                    ...prevState.Contact,
                                                    section2: {
                                                        ...prevState.Contact.section2,
                                                        telephoneText: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.Contact?.section2?.telephoneText} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Working Hours</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, Contact: {
                                                    ...prevState.Contact,
                                                    section2: {
                                                        ...prevState.Contact.section2,
                                                        WorkingHours: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.Contact?.section2?.WorkingHours} className="form-control login-inputs w-100 " />
                                        </div>

                                    </div>
                                    <button type="submit" className="btn btn-primary">Change</button>
                                </form>
                            </Route>
                            {/* FAQ  */}

                            <Route exact path='/dashboard/faq/section1'>
                                <div className="text-center">
                                    <h1 >Section 1</h1>
                                </div>
                                <form onSubmit={(e) => changeLayoutHandler(e, "section1", "FAQ")}>
                                    <div className="form-group">
                                        <div className="mb-4 w-100  ">
                                            <label>Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, FAQ: {
                                                    ...prevState.FAQ,
                                                    section1: {
                                                        ...prevState.FAQ.section1,
                                                        heading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.FAQ?.section1?.heading} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Left Sub Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, FAQ: {
                                                    ...prevState.FAQ,
                                                    section1: {
                                                        ...prevState.FAQ.section1,
                                                        leftSubHeading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.FAQ?.section1?.leftSubHeading} className="form-control login-inputs w-100 " />
                                        </div>
                                        <div className="mb-4 w-100  ">
                                            <label>Right Sub Heading</label>
                                            <input onChange={(e) => setState(prevState => ({
                                                ...prevState, FAQ: {
                                                    ...prevState.FAQ,
                                                    section1: {
                                                        ...prevState.FAQ.section1,
                                                        rightSubHeading: e.target.value
                                                    }
                                                }
                                            }))} type="text" value={state?.FAQ?.section1?.rightSubHeading} className="form-control login-inputs w-100 " />
                                        </div>

                                    </div>
                                    <button type="submit" className="btn btn-primary">Change</button>
                                </form>
                            </Route>
                            <Route exact path='/dashboard/faq/section2'>
                                <div className='container-fluid'>
                                    <div className="text-center">
                                        <h1 >FAQ'S</h1>
                                    </div>
                                    <form onSubmit={(e) => changeLayoutHandler(e, "section2", "FAQ")}>

                                        {inputFields && inputFields?.map((inputField, i) => (
                                            <div key={inputField.id} style={{ marginBottom: "10px" }}>

                                                <div className="mb-4 w-100  ">
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
                                                    <button className="btn btn-primary text-white" onClick={handleAddFields}>ADD</button>
                                                    &nbsp;
                                                    <button className="btn btn-danger" disabled={inputFields.length === 1}
                                                        onClick={() =>
                                                            handleRemoveFields(inputField.id)
                                                        }>DELETE</button>
                                                </div>
                                                <hr />
                                            </div>
                                        ))}

                                        <button type="submit" className="btn btn-primary">Change</button>
                                    </form>
                                </div>
                            </Route>

                            {/* Blog */}
                            <Route exact path="/dashboard/blog/section1">
                                <div className="container-fluid">
                                    <div className="text-center">
                                        <h1 >Section 1</h1>
                                    </div>
                                    <form onSubmit={(e) => changeLayoutHandler(e, "section1", "Blog")}>
                                        <div className="form-group">
                                            <div className="mb-4 w-100  ">
                                                <label>Heading</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Blog: {
                                                        ...prevState.Blog,
                                                        section1: {
                                                            ...prevState.Blog.section1,
                                                            heading: e.target.value
                                                        }
                                                    }
                                                }))} type="text" value={state?.Blog?.section1?.heading} className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4 w-100  ">
                                                <label>Left Sub Heading</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Blog: {
                                                        ...prevState.Blog,
                                                        section1: {
                                                            ...prevState.Blog.section1,
                                                            leftSubHeading: e.target.value
                                                        }
                                                    }
                                                }))} type="text" value={state?.Blog?.section1?.leftSubHeading} className="form-control login-inputs w-100 " />
                                            </div>
                                            <div className="mb-4 w-100  ">
                                                <label>Right Sub Heading</label>
                                                <input onChange={(e) => setState(prevState => ({
                                                    ...prevState, Blog: {
                                                        ...prevState.Blog,
                                                        section1: {
                                                            ...prevState.Blog.section1,
                                                            rightSubHeading: e.target.value
                                                        }
                                                    }
                                                }))} type="text" value={state?.Blog?.section1?.rightSubHeading} className="form-control login-inputs w-100 " />
                                            </div>

                                        </div>
                                        <button type="submit" className="btn btn-primary">Change</button>
                                    </form>
                                </div>
                            </Route>

                            <Route exact path="/dashboard/blog/section2">
                                <div className="text-center">
                                    <h1 className="bolder-font">Create BLOG</h1>
                                </div>
                                <form onSubmit={(e) => changeLayoutHandler(e, 'section2', "Blog")}>
                                    <div className="mb-4 w-100  ">
                                        <label>Enter Title of Blog:</label>
                                        <input onChange={(e) => setBlogTitle(e.target.value)} type="text" value={blogTitle} className="form-control login-inputs w-100 " />
                                    </div>
                                    <div className="mb-4 w-100  ">
                                        <label>Upload Featured Image:</label>
                                        <input onChange={(e) => setFeaturedImage(e.target.files[0])} type="file" className="form-control login-inputs w-100 " />
                                    </div>
                                    <div className="mb-4">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                extraPlugins: [MyCustomUploadAdapterPlugin]
                                            }}
                                            image={{
                                                styles: [
                                                    // This option is equal to a situation where no style is applied.
                                                    'full',

                                                    // This represents an image aligned to the left.
                                                    'alignLeft',

                                                    // This represents an image aligned to the right.
                                                    'alignRight'
                                                ]

                                            }}
                                            onChange={getEditorValues}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Change</button>
                                </form>
                            </Route>
                        </Paper>
                    </div>
                </Switch>
            </div>
        </Router >
    )
}