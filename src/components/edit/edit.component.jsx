import "./edit.styles.css"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from "react";


const EditInfo = ({ singleSim, setSingleSim, setShowSingleSim }) => {

    let startDate = new Date(singleSim[0].activatedate)
    let endDate = new Date(singleSim[0].expirydate)

    let padToTwoDigits = (date) => {
        return String(date).padStart(2, '0')
    }

    let formatDate = (date) => {
        return `${date.getFullYear()}-${padToTwoDigits(date.getMonth()+1)}-${padToTwoDigits(date.getDate())}`
    }

    const cancelHandler = () => {
        setSingleSim([])
        setShowSingleSim(false)
    }

    const [simcard, setSimcard] = useState(singleSim[0].simno)
    const [customer, setCustomer] = useState(singleSim[0].customer)
    const [vehiclePlate, setVehiclePlate] = useState(singleSim[0].vehicleplate)
    const [project, setProject] = useState(singleSim[0].project)
    const [activateDate, setActivationDate] = useState(formatDate(startDate))
    const [expiryDate, setExpiryDate] = useState(formatDate(endDate))

    return (
        <>
            <div className="edit-component-container">
                <h1>Edit SIM ID: {singleSim[0].id}</h1>
                <div className="edit-main">
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
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control type="date" placeholder="Exipiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                        <Button variant="Warning" onClick={cancelHandler}>
                            Cancel
                        </Button>
                    </Form> 
                </div>
            </div>
        </>
    )
}

export default EditInfo