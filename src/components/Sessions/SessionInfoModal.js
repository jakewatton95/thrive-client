import React from 'react'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import Times from '../../data/times'

const SessionInfoModal = ({showModal, modalInfo, hideModal}) => {
    const {date, location, length} = modalInfo.sessionInfo
    const {subject} = modalInfo.sessionInfo.product
    const {name: studentName} = modalInfo.sessionInfo.product.student
    const {name: tutorName} = modalInfo.sessionInfo.product.tutor
    const {userRole} = modalInfo
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
            Session Info
        </Modal.Header>
        <Modal.Body>
            {userRole !== 'Student' ? <div>Student: {studentName} </div> : null}
            {userRole !== 'Tutor' ? <div> Tutor: {tutorName} </div> : null}
            <div>
                Subject: {subject}
            </div>
            <div>
                Date: {moment(date).format('llll')}
            </div>
            <div>
                Length: {Times.find(time => time.value == length).time}
            </div>
            <div>
                Location: {location}
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