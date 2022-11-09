import "./record.styles.css"

import Table from 'react-bootstrap/Table';

import { useState, useEffect } from "react";

const RecordPage = () => {

    const [simInfo, setSimInfo] = useState([])

    useEffect(() => {
        let getSimInfo = async() => {
            try {
                let response = await fetch('http://localhost:9960/getRecord')
                let data = await response.json()
                setSimInfo([].concat(data))
            }catch(err) {
                alert("Error: " + err)
            }
        }
        getSimInfo()
    }, [])

    return (
        <>
            <div className="record-page-container">
                <h3>SIM Card Record</h3>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>SIM card no.</th>
                            <th>Vehicle Plate</th>
                            <th>Customer Name</th>
                            <th>Project</th>
                            <th>Activation Date</th>
                            <th>Expected Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            simInfo.map(sim => {
                                return (
                                    <tr>
                                        <td>{sim.id}</td>
                                        <td>{sim.simno}</td>
                                        <td>{sim.vehicleplate}</td>
                                        <td>{sim.customer}</td>
                                        <td>{sim.project}</td>
                                        <td>{sim.activatedate}</td>
                                        <td>{sim.expirydate}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default RecordPage