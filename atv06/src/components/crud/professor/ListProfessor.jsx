import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

import ProfessorTableRow from "./ProfessorTableRow";
//import { students } from './data.js'

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseServiceProfessor from "../../../services/FirebaseServiceProfessor";

const ListProfessorPage = () => 
    <FirebaseContext.Consumer>
        {(firebase) => <ListProfessor firebase={firebase} />}
    </FirebaseContext.Consumer>


function ListProfessor(props) {

    const [professors, setProfessors] = useState([])

    useEffect(
        () => {
            //axios.get("http://localhost:3001/students")
            /*axios.get("http://localhost:3002/crud/students/list")
                .then(
                    (res) => {
                        setStudents(res.data)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )*/
            //console.log(props.firebase.getFirestoreDb())
            FirebaseServiceProfessor.list_onSnapshot(
                props.firebase.getFirestoreDb(), 
                (professors)=>{
                    setProfessors(professors)
                }
            )
        }
        ,
        [props] 
    )

    function deleteProfessorById(_id){
        let professorsTemp = professors
        for(let i=0;i<professorsTemp.length;i++){
            if(professorsTemp[i]._id === _id){
                //console.log("1")
                professorsTemp.splice(i,1)
            }
        }
        setProfessors([...professorsTemp]) //deve-se criar um outro array para disparar o re-render
        //setStudents(studentsTemp)
        //setFlag(!flag)
    }

    function generateTable() {

        if (!professors) return
        return professors.map(
            (professor, i) => {
                return <ProfessorTableRow 
                            professor={professor} 
                            key={i} 
                            deleteProfessorById={deleteProfessorById}
                            firestoreDb = {props.firebase.getFirestoreDb()}
                            />
            }
        )
    }

    return (
        <>
            <main>
                <h2>
                    Listar Professores
                </h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Universidade</th>
                            <th>Titulação</th>
                            <th colSpan={2} style={{ textAlign: "center" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTable()}
                    </tbody>
                </table>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default ListProfessorPage