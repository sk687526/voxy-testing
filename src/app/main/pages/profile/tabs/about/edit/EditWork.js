import React, {useEffect, useState} from 'react';
import {CardContent} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function EditWork(){
	const [about, setAbout] = useState(null);
	const handleChange = name => event => {

    setAbout({ about: event.target.value });
  };
	return(
		<CardContent>
		<TextField
                        id="standard-multiline-flexible"
                        label="Occupation"
                        multiline
                        className="w-full"
                        onChange={handleChange('multiline')}
                        
                        margin="normal"
                      />
        <TextField
                        id="standard-multiline-flexible"
                        label="Skills"
                        multiline
                        className="w-full"
                        onChange={handleChange('multiline')}
                        
                        margin="normal"
                      />
        <TextField
                        id="standard-multiline-flexible"
                        label="Jobs"
                        multiline
                        className="w-full"
                        onChange={handleChange('multiline')}
                        
                        margin="normal"
                      />
        </CardContent>
		);
}

export default EditWork;