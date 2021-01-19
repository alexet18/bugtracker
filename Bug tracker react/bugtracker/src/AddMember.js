import {Dialog,DialogTitle,DialogActions,DialogContent} from 'react-dialog';
import React, { useEffect, useState } from "react";
import './App.css';



export default function DialogMembers()
{
 
    var projects = [];

const [modalIsOpen,setModalIsOpen] = useState(false);

fetch('http://localhost:8000/api/getProjectsWithMembers/')
.then(response=>response.json()).then(
data=> projects.push(data)).then(()=>console.log(projects))



return(
    <ul id = {"projectsList"}>
                {   
     
                        
                    projects.map(project=>
                        
                        <li  key = {project.Id} onClick = {(e) => {console.log(e);}}>
                            <label class="projectnames">
                            {project.ProjectName}
                            </label>
                            <table>
                            <th>Project</th>
                            <tr>Repository Link:</tr>
                            <tr>Test</tr>
                        </table>
                       
                        <table>
                            <th>Members</th>
                            <tr><button id = {"addbtn"} >{"ADD MEMBER"}</button></tr>
                             {project.Members.map(member => <tr>{member.MemberEmail}</tr>)}
                        </table>
                       <table>
                           <th>Bugs</th>
                           <tr><button id={"addbug"}>{"ADD BUG"}</button></tr>
                           <tr>{project.Bugs.map(bug=><table id = "bugs-table">
                           <th>{"Name: "}{bug.BugName}</th>
                           <tr>{"  Severity: "}{bug.BugSeverity}</tr>
                           <tr>{"Link to bug: "}{bug.BugLink}</tr>
                           <tr>{"Solution link: "}{bug.BugSolutionLink}</tr>
                           
                           </table>
                           )}</tr>
                       </table>
                        </li>
                      
                                                    

                        )
                }
            </ul>
)

}