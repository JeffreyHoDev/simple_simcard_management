import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./entry.styles.css"

import { useState } from 'react';

const EntryPage = () => {

    const [simcard, setSimcard] = useState(100000000000000000)
    const [customer, setCustomer] = useState("")
    const [vehiclePlate, setVehiclePlate] = useState("")
    const [project, setProject] = useState("")
    const [activateDate, setActivationDate] = useState("")
    const [expiryLength, setExpiryLength] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        let submit = async() => {
            if(simcard > 999999999999999999 || simcard < 100000000000000000) {
                alert("Invalid Sim Card Number")
            }else {
                try {
                    setIsSubmitting(true)
                    let response = await fetch(`http://${process.env.REACT_APP_IP}:9960/insertRecord`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            simcard,
                            customer,
                            project,
                            activateDate,
                            vehiclePlate,
                            expiryLength,
                            status: 'A'
                        })
                    })
                    let data = await response.json()
                    console.log(data)
                    if(data.rowCount === 1) {
                        alert("Successfully Added")
                        resetField()
                        setIsSubmitting(false)
                    }else {
                        alert("Failed to Add. Please try again")
                        setIsSubmitting(false)
                    }
                }catch(err) {
                    alert("Error: " + err)
                    setIsSubmitting(false)
                }
            }
        }
        submit()
        
    }

    const resetField = () => {
        setSimcard(0)
        setCustomer("")
        setProject("")
        setActivationDate("")
        setVehiclePlate("")
    }

    return (
        <>
            <div className="entry-page-container">
                <h1>Enter SIM card information</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>SIM card no.</Form.Label>
                        <Form.Control type="number" placeholder="Enter Sim Card No." value={simcard} onChange={(e) => setSimcard(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control type="text" placeholder="Customer Name" value={customer} onChange={(e) => setCustomer(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Vehicle Plate</Form.Label>
                        <Form.Control type="text" placeholder="Vehicle Plate" value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Project</Form.Label>
                        <Form.Control type="text" placeholder="Project Name" value={project} onChange={(e) => setProject(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Activation Date</Form.Label>
                        <Form.Control type="date" placeholder="Activation Date" value={activateDate} onChange={(e) => setActivationDate(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Expiry Length</Form.Label>
                        <Form.Select onChange={(e) => setExpiryLength(e.target.value)}>
                            <option value="1">One Year</option>
                            <option value="2">Two Years</option>
                            <option value="3">Three Years</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" disabled={isSubmitting} type="submit" onClick={submitHandler}>
                        Submit
                    </Button>
                    <p>
                        {isSubmitting ? "Submitting..." : null }
                    </p>
                </Form>
            </div>
        </>
    )
}

export default EntryPage;