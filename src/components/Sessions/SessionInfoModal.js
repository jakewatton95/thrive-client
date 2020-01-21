import React from 'react'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import Times from '../../data/times'

const SessionInfoModal = ({showModal, modalInfo, hideModal}) => {

    let {userRole} = modalInfo
    let {Tutor, Student, Subject, Location, date, SessionLength} = modalInfo.sessionInfo
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
            Session Info
        </Modal.Header>
        <Modal.Body>
            {userRole !== 'Student' ? <div>Student: {Student} </div> : null}
            {userRole !== 'Tutor' ? <div> Tutor: {Tutor} </div> : null}
            <div>
                Subject: {Subject}
            </div>
            <div>
                Date: {moment(date).format('llll')}
            </div>
            <div>
                Length: {Times.find(time => time.value == SessionLength).time}
            </div>
            <div>
                Location: {Location}
            </div>
        </Modal.Body>
        {!modalInfo.secondaryRole && (userRole == 'Student' || userRole == 'Tutor') &&
        <Modal.Footer>
            <button>edit session</button>
            <button>cancel session</button>
        </Modal.Footer>
        }
    </Modal>
    )
}

export default SessionInfoModal