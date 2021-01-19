import './App.css';
import React, { useState } from 'react';
import Modal from 'react-modal'
import axios from 'axios'





function AddProject() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [projName, setProjectName] = useState('n/a');
    const [repoUrl, setRepoUrl] = useState('n/a');

    return (
        <div>
            <Modal isOpen={modalIsOpen}>
                <div class={"add-proj"}>
                    <div class={"add-proj-name"}>
                        <label>Project name:   </label>
                        <input onInput={(e)=>{setProjectName(e.target.value)}}></input>
                    </div>
                    <div class={"add-proj-name"}>
                        <label>Repository:   </label>
                        <input onInput={(e)=>{setRepoUrl(e.target.value)}}></input>
                    </div>
                    <button onClick={() => {
                       
                       
                                 
                         


                        axios.post('http://localhost:8000/api/addProject', {
                            ProjectName: projName,
                            RepositoryLink: repoUrl
                        }).then(()=>{
                            fetch('http://localhost:8000/api/getProjectIdByName/'+projName).then(response=>response.json()).
                            then(data=>{

                                axios.post('http://localhost:8000/api/addMemberToProject',{
                                    Type: "MP",
                                    MemberId: localStorage.getItem("id"),
                                    ProjectId: data[0].Id
                                }).then(window.location.reload())
                            })
                        })



                    }}>Save</button>
                    <button onClick={() => { setModalIsOpen(false) }}>Close</button>
                </div>
            </Modal>
            <button id="add-proj-btn" onClick={() => { setModalIsOpen(true) }}>Add Project</button>
        </div>
    )
}

function add() {



}

export default AddProject;