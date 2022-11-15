import "./record.styles.css"

import Table from 'react-bootstrap/Table';

import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import { exportToExcel } from '../../util/excel'
import EditInfo from "../../components/edit/edit.component";

const RecordPage = () => {

    const [simInfo, setSimInfo] = useState([])
    const [singleSim, setSingleSim] = useState(null)
    const [showSingleSim, setShowSingleSim] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        let getSimInfo = async() => {
            try {
                setIsFetching(true)
                let response = await fetch(`http://${process.env.REACT_APP_IP}:9960/getRecord`)
                let data = await response.json()
                setSimInfo([].concat(data))
                setIsFetching(false)
            }catch(err) {
                alert("Error: " + err)
                setIsFetching(false)
            }
        }
        getSimInfo()
    }, [showSingleSim])

    const editButtonHandler = (index) => {
        setSingleSim([].concat(simInfo[index]))
        setShowSingleSim(true)
    }

    return (
        <>
        {
            !showSingleSim ? (
                <div className="record-page-container">
                <h3>SIM Card Record</h3>
                {isFetching ? null 
                : (
                    <Button type="button" onClick={() => exportToExcel(simInfo)}>Export Excel</Button>
                )}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>SIM card no.</th>
                            <th>Vehicle Plate</th>
                            <th>Customer Name</th>
                            <th>Project</th>
                            <th>Activation Date</th>
                            <th>Expected Expiry Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            simInfo.map((sim, index) => {
                                return (
                                    <tr key={`sim-${sim.id}`}>
                                        <td>{sim.id}</td>
                                        <td>{sim.simno}</td>
                                        <td>{sim.vehicleplate}</td>
                                        <td>{sim.customer}</td>
                                        <td>{sim.project}</td>
                                        <td>{sim.activatedate}</td>
                                        <td>{sim.expirydate}</td>
                                        <td>{sim.status === 'A' ? "Active" : "Disabled"}</td>
                                        <td><Button onClick={() => editButtonHandler(index)}>Edit</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            ): (
                <EditInfo setSingleSim={setSingleSim} setShowSingleSim={setShowSingleSim} singleSim={singleSim}/>
            )
        }

        </>
    )
}

export default RecordPage