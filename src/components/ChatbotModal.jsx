import { useState } from 'react';
import { Button, Form, Modal, InputGroup, FormControl } from 'react-bootstrap';

export default function ChatbotModal({ show, handleClose }) {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const sendMessage = async (event) => {
        event.preventDefault();
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const apiKey = "sk-proj-zuvVB6j04RQehym7cTF1T3BlbkFJfo1ceW5t3ihTfFkRuuom";

        const messagesToSend = [
            ...allMessages,
            {
                role: 'user',
                content: message
            }
        ];

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messagesToSend
            })
        })

        const data = await response.json();

        if (data) {
            let newAllMessages = [
                ...messagesToSend,
                data.choices[0].message
            ]
            setAllMessages(newAllMessages)
            setMessage('')
        }
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title id="contained-modal-title-vcenter" className="fs-4">
          Moonway AI Doctor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="messages-display" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {allMessages.map((msg, index) => (
            <div key={index} className={`d-flex mb-2 align-items-center ${msg.role}`}>
              <div className="role-icon me-2"></div>
              <p className="mb-0"><strong>{msg.role}:</strong> {msg.content}</p>
            </div>
          ))}
        </div>

        <Form onSubmit={sendMessage}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Ask Moonway AI Doctor anything..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="rounded-pill me-2"
            />
            <Button variant="outline-secondary" type="submit" id="button-addon2" className="rounded-pill">
              Send
            </Button>
          </InputGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
}