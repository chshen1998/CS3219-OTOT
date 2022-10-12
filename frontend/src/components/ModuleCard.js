import {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';

import EditModuleButton from './EditModuleButton.js';
import DeleteModuleButton from './DeleteModuleButton.js'

const ModuleCard = ({code, title, callFunc}) => {
    return (
        <div className='moduleCard'>
            <Grid container direction="row" justify="space-around" alignItems='center'>
                <div className='titleTile'><p>{code}</p></div>
                <div className='companyTile'><p>{title}</p></div>
                <div className='statusTile'>
                    <Grid container direction="row" justify="space-around" alignItems='center'>
                        <EditModuleButton code={code} callFunc={callFunc}/>
                        <DeleteModuleButton code={code} callFunc={callFunc}/>
                    </Grid>
                </div>
            </Grid>
        </div>
    );
}

export default ModuleCard;