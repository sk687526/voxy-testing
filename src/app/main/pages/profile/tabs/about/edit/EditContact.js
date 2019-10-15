import React, {useEffect, useState} from 'react';
import {CardContent} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function EditContact(){
	const [about, setAbout] = useState(null);
	const handleChange = name => event => {

    setAbout({ about: event.target.value });
  };
	return(
		<CardContent>
		<TextField
                        id="standard-multiline-flexible"
                        label="Address"
                        multiline
                        className="w-full"
                        onChange={handleChange('multiline')}
                        
                        margin="normal"
                      />
        <TextField
                        id="standard-multiline-flexible"
                        label="Tel."
                        multiline
                        className="w-full"
                        onChange={handleChange('multiline')}
                        
                        margin="normal"
                      />
        <TextField
                        id="standard-multiline-flexible"
                        label="Website"
                        multiline
                        className="w-full"
                        onChange={handleChange('multiline')}
                        
                        margin="normal"
                      />
        <TextField
                        id="standard-multiline-flexible"
                        label="Emails"
                        multiline
                        className="w-full"
                        onChange={handleChange('multiline')}
                        
                        margin="normal"
                      />
        </CardContent>

		);
}

export default EditContact;