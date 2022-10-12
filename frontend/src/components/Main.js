import {useState, useEffect} from 'react';
import axios from "axios";
import {Grid} from '@material-ui/core';

import ModuleCard from './ModuleCard.js';
import AddModuleButton from './AddModuleButton.js'
import {API_URL} from "./config.js"

const Main = () => {
    const [modules, setModules] = useState([]);
    const [calls, setCalls] = useState(0);

    useEffect(() => {
        getModules()
    }, [calls])

    const getModules = () => {
        axios.get(API_URL).then((response) => {
            if (response.status == 200) {      
                setModules(response.data)
                console.log(response.data)
            } else {
                console.log("Unable to get modules from server")
            }
        })
    }

    const updateCalls = () => {
        setCalls(calls + 1)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column"}} classname='buttonGroup'>
            <Grid container direction="column" justify="center" alignItems='center'>
                <Grid container direction="row" justify="space-around" alignItems='center'>
                    <div><p className='columnHeader'>Module Code</p></div>
                    <div><p className='columnHeader'>Title</p></div>
                    <div><p className='columnHeader'></p></div>
                </Grid>

                {modules.map(module => {
                    return (
                        <Grid key={module["code"]} container direction="row" justify="space-around" alignItems='center'>
                            <ModuleCard code={module["code"]} title={module["title"]} callFunc={updateCalls}/>
                        </Grid>
                    );
                })}
                <br/>

                <AddModuleButton callFunc={updateCalls}/>
            </Grid>
        </div>
    );
}

export default Main