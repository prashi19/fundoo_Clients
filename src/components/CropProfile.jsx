import React ,{Component} from "react";
import { Dialog } from "@material-ui/core";
import { DialogTitle } from '@material-ui/core/DialogTitle';
export default class CropProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      open:false,
    }
  }
    render()
    {
      const {open}=this.props;
      return (        
        <div>
          <Dialog
          open={open}>
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          </Dialog>
        </div>
      )
    }
}
  
   