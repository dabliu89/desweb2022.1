import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//import { students } from './data.js'
import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseServiceProfessor from "../../../services/FirebaseServiceProfessor";


const EditProfessorPage = () =>
    <FirebaseContext.Consumer>
        {(firebase)=><EditProfessor firebase={firebase} />}
    </FirebaseContext.Consumer>

function EditProfessor(props) {

    const [name, setName] = useState("")
    const [university, setUniversity] = useState("")
    const [degree, setDegree] = useState("")
    const params = useParams()
    const navigate = useNavigate()

    //https://pt-br.reactjs.org/docs/hooks-effect.html
    useEffect(
        () => {

            //axios.get('http://localhost:3001/students/' + params.id)
            /*axios.get('http://localhost:3002/crud/students/retrieve/' + params.id)
                .then(
                    (res) => {
                        setName(res.data.name)
                        setCourse(res.data.course)
                        setIRA(res.data.ira)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )*/
            //FirebaseService.retrieve(
            FirebaseServiceProfessor.retrieve_promisse(
                props.firebase.getFirestoreDb(),
                (professor)=>{
                    setName(professor.name)
                    setUniversity(professor.university)
                    setDegree(professor.degree)
                },
                params.id
            )

        }
        ,
        [params.id,props]
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedProfessor =
        {
            name, university, degree
        }
        //axios.put('http://localhost:3001/students/' + params.id, updatedStudent)
        /*axios.put('http://localhost:3002/crud/students/update/' + params.id, updatedStudent)
            .then(
                res => {
                    //console.log(res.data)
                    //props.history.push('/listStudent');
                    //console.log(props)
                    navigate("/listStudent")
                }
            )
            .catch(error => console.log(error))*/
        FirebaseServiceProfessor.update(
            props.firebase.getFirestoreDb(),
            ()=>{
                navigate("/listProfessor")
            },
            params.id,
            updatedProfessor)
    }

    return (
        <>
            <main>
                <h2>
                    Editar Professor
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            className="form-control"
                            value={(name == null || name === undefined) ? "" : name}
                            name="name"
                            onChange={(event) => { setName(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Universidade: </label>
                        <input type="text"
                            className="form-control"
                            value={university ?? ""}
                            name="university"
                            onChange={(event) => { setUniversity(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Titulação: </label>
                        <input type="text"
                            className="form-control"
                            value={degree ?? ""}
                            name="degree"
                            onChange={(event) => { setDegree(event.target.value) }} />
                    </div>
                    <div className="form-group" style={{ paddingTop: 20 }}>
                        <input type="submit" value="Atualizar Professor" className="btn btn-primary" />
                    </div>
                </form>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default EditProfessorPage