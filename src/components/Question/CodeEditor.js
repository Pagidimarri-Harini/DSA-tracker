import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-beautify';

function CodeEditor({ runCode }) {
    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState('monokai');
    const [code, setCode] = useState('');

    useEffect(() => {
        require('ace-builds/src-noconflict/mode-python');
        require('ace-builds/src-noconflict/mode-c_cpp');
        require('ace-builds/src-noconflict/mode-java');
        require('ace-builds/src-noconflict/theme-github');
        require('ace-builds/src-noconflict/theme-twilight');
    }, []);

    const handleRun = () => {
        runCode(language, code)
    };

    const handleChange = (value) => {
        setCode(value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="language">
                            <Form.Label>Language:</Form.Label>
                            <Form.Select value={language} onChange={handleLanguageChange}>
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="c_cpp">C++</option>
                                <option value="java">Java</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="theme">
                            <Form.Label>Theme:</Form.Label>
                            <Form.Select value={theme} onChange={handleThemeChange}>
                                <option value="monokai">Monokai</option>
                                <option value="github">GitHub</option>
                                <option value="twilight">Twilight</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <AceEditor
                        setOptions={{ useWorker: false }}
                        mode={language}
                        theme={theme}
                        value={code}
                        onChange={handleChange}
                        name="code_editor0"
                        width="100%"
                        height="600px"
                        fontSize={15}
                    />
                    <Button variant="primary" className='mt-3' onClick={handleRun}>Run Code</Button>
                </Card.Body>
            </Card>
        </Accordion>
    );
}

export default CodeEditor;
