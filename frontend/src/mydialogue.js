import React from 'react';
import { TextField } from '@mui/material';

class MyDialogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    }


    render() {

        return (
            <div className="dialogue">
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name of Task"
                    type="plain"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="deadline"
                    label="Deadline"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    multiline
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="priority"
                    label="Priority"
                    type="number"
                    onChange={(event) =>
                        event.target.value < 0
                            ? (event.target.value = 0)
                            : event.target.value
                    }
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="state"
                    label="State"
                    select
                    values={'asd'}
                    onChange={(event) =>
                        event.target.value < 0
                            ? (event.target.value = 0)
                            : event.target.value
                    }
                    fullWidth
                    variant="standard"
                />
            </div>
        );
    }
}
export default MyDialogue;