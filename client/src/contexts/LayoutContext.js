import React, { useState, useEffect, createContext } from 'react'
import axios from 'src/utils/axios'

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {

    const [state, setState] = useState('')

    useEffect(() => {
        getLayout()
    }, [])

    const getLayout = async () => {
        axios.get(`${process.env.REACT_APP_PORT}/api/layout/getLayout`).then(res => {
            console.log(res.data)
            if (res) setState(res.data.layout?.Layout)
        })
    }


    return (
        <LayoutContext.Provider value={{
            state
        }}>
            {children}
        </LayoutContext.Provider>
    )
};

