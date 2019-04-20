import React, { Component } from 'react';
import { Card, Chip } from '@material-ui/core';
import Tools from '../components/tools';
import EditPin from '../components/editpin';
import DialogBox from '../components/cardDialog';
export default class PinAndOthers extends Component {
    constructor() {
        super();
        this.state = {
            open1: false,
        }
        this.cardsToDialogBox = React.createRef();
    }
    async handleClick(note) {
        this.cardsToDialogBox.current.getData(note);;
        await this.setState({ open1: true })
    }
    closeEditBox = (e) => {
        this.setState({ open1: false })
    }
    render() {
        let cardsView = this.props.noteProps ? "cards" : "listCards";
        return (
            <div>
                <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>PINNED</label>
                <div className="CardsView" style={{ marginBottom: "30px" }}>
                    {this.props.pinArray.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0", wordBreak: "break-word" }} >
                                <div className="DispCont">
                                    <div>
                                        {key.image !== "" ?
                                            <img style={{
                                                maxWidth: "100%",
                                                height: "auto"
                                            }} src={key.image} alt="cardImage"></img>
                                            : null}
                                    </div>
                                    <div onClick={() => this.handleClick(key)} style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.title}</b>
                                        <div>
                                            <EditPin
                                                cardPropsToPin={this.props.pinNote}
                                                noteID={key._id}
                                                pinStatus={key.pinned}
                                            />
                                        </div>
                                    </div>
                                    <div onClick={() => this.handleClick(key)}>
                                        {key.description}
                                    </div>
                                    {key.reminder ?
                                        <Chip
                                            label={key.reminder}
                                            onDelete={() => this.props.reminder("", key._id)}
                                        />
                                        :
                                        null}
                                    {key.label.length > 0 ?
                                        key.label.map((key1) =>
                                            <Chip
                                                label={key1}
                                                onDelete={() => this.props.deleteLabelFromNote(key1, key._id)}
                                            />
                                        )
                                        :
                                        null}
                                </div>
                                <div className="noteicons">
                                    <Tools
                                        createNotePropsToTools={this.props.createNotePropsToTools}
                                        archiveNote={this.props.archiveNote}
                                        noteID={key._id}
                                        archiveStatus={key.archive}
                                        reminder={this.props.reminder}
                                        note={key}
                                        trashNote={this.props.trashNote}
                                    />
                                </div>
                            </Card>)
                    })
                    }
                    <DialogBox
                        // ispinned={this.props.ispinned}
                        ref={this.cardsToDialogBox}
                        parentProps={this.state.open1}
                        handleEdit={this.handleClick}
                        closeEditBox={this.closeEditBox}
                        // note={notesArray[key].note}
                        archiveNote={this.props.archiveNote}
                        reminder={this.props.reminderNote}
                        trashNote={this.props.trashNote}
                        // noteID={notesArray[key]._id}
                        // archiveStatus={notesArray[key].archive}
                        editTitle={this.props.editTitle}
                        editDescription={this.props.editDescription}
                        createNotePropsToTools={this.props.getColor}
                    />
                </div>
                {this.props.othersArray !== 0 ?
                    <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>OTHERS</label>
                    :
                    null}
                <div className="CardsView">
                    {this.props.othersArray.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0", wordBreak: "break-word" }} >
                                <div className="DispCont">
                                    <div>
                                        {key.image !== "" ?
                                            <img style={{
                                                maxWidth: "100%",
                                                height: "auto"
                                            }} src={key.image} alt="cardImage"></img>
                                            : null}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.title}</b>
                                        <div>
                                            <EditPin
                                                cardPropsToPin={this.props.pinNote}
                                                noteID={key._id}
                                                pinStatus={key.pinned}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        {key.description}
                                    </div>
                                    {key.reminder ?
                                        <Chip
                                            label={key.reminder}
                                            onDelete={() => this.props.reminder("", key._id)}
                                        />
                                        :
                                        null}
                                    {key.label.length > 0 ?
                                        key.label.map((key1) =>
                                            <Chip
                                                label={key1}
                                                onDelete={() => this.props.deleteLabelFromNote(key1, key._id)}
                                            />
                                        )
                                        :
                                        null}
                                </div>
                                <div className="noteicons">
                                    <Tools
                                        createNotePropsToTools={this.props.getColor}
                                        note={key}
                                        noteID={key._id}
                                        reminder={this.props.reminder}
                                        archiveNote={this.props.archiveNote}
                                        archiveStatus={key.archive}
                                        trashNote={this.props.trashNote}
                                        uploadImage={this.props.uploadImage}
                                        deleteLabelFromNote={this.props.deleteLabelFromNote}
                                        addLabelToNote={this.props.addLabelToNote}
                                    />
                                </div>
                            </Card>
                        )
                    })
                    }
                    <DialogBox
                        // ispinned={this.props.ispinned}
                        ref={this.cardsToDialogBox}
                        parentProps={this.state.open1}
                        handleEdit={this.handleClick}
                        closeEditBox={this.closeEditBox}
                        // note={notesArray[key].note}
                        archiveNote={this.props.archiveNote}
                        reminder={this.props.reminderNote}
                        trashNote={this.props.trashNote}
                        // noteID={notesArray[key]._id}
                        // archiveStatus={notesArray[key].archive}
                        editTitle={this.props.editTitle}
                        editDescription={this.props.editDescription}
                        createNotePropsToTools={this.props.getColor}
                    />
                </div>
            </div>
        )
    }
}