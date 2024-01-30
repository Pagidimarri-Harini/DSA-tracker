import React, { useEffect } from 'react'
import "./Question.css"
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import { useAuth } from '../AuthContext';

function Question({ qd }) {
    const { isLoggedIn } = useAuth();
    let navigate = useNavigate();
    const { iTopic, iQuestion, qu } = useParams()

    const getData = async () => {
        const res = await fetch(`${process.env.REACT_APP_DOMAIN}/q/${iTopic}/${qu}`, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem("authToken")
            },
        })
        if (res.ok) {
            const data = await res.json()
            document.getElementsByClassName("xyz")[0].innerHTML = data.problem
            document.getElementsByClassName("xTopic")[0].innerHTML = data.title
            document.getElementsByClassName("xTag")[0].innerHTML = data.difficulty
            document.getElementsByClassName("xTag1")[0].innerHTML = "Accuracy: " + data.accuracy
            document.getElementsByClassName("xTag2")[0].innerHTML = "Submissions: " + data.submissions
            document.getElementsByClassName("xTag3")[0].innerHTML = "Points: " + data.points
        } else {
            document.getElementsByClassName("xOut")[0].innerHTML = "<h3>404</h3>"
        }
    }

    const runCode = async (lang, code) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_DOMAIN}/run`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem("authToken")
                },
                body: JSON.stringify({
                    lang, code
                })
            })
            if (!res.ok) {
                return alert("could not run the code");
            }
            const resData = await res.json()
            console.log(resData);
        } catch (error) {
            alert("could not run the code");
        }
    }

    useEffect(() => {
        isLoggedIn ? getData() : navigate("/login")
        // eslint-disable-next-line
    }, [isLoggedIn])

    return (
        <Container className='mt-3' fluid>
            <Row>
                <Col sm={6}>
                    <div className=' bg-light p-2'>
                        <ul className="nav nav-tabs bg-transparent">
                            <li className="nav-item">
                                <div className="nav-link active" aria-current="page">
                                    <i className="fa fa-fw fa-code"></i>
                                    Problem
                                </div>
                            </li>
                        </ul>
                        <div className='xOut'>
                            <div className=' p-1 xTopicBox'>
                                <h4 className=' d-inline fw-bold p-1 xTopic'>...</h4>
                                <i className={`fa fa-fw ${qd &&
                                    qd.length !== 0 && qd[iTopic].questions[iQuestion].Bookmark ?
                                    "fa-bookmark" : "fa-bookmark-o"
                                    }`}></i>
                            </div>
                            <div>
                                <span className='m-1 p-1 fw-bold xTag'></span>
                                <span className='m-1 p-1 fw-bold xTag1'></span>
                                <span className='m-1 p-1 fw-bold xTag2'></span>
                                <span className='m-1 p-1 fw-bold xTag3'></span>
                            </div>
                            <div className='p-1'>
                                <hr />
                            </div>
                            <div className='p-2 xyz'>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={6}>
                    <CodeEditor runCode={runCode} />
                </Col>
            </Row>
        </Container>
    )
}

export default Question