import React, {useState} from 'react'
import moment from 'moment'
import SessionInfoModal from './SessionInfoModal'
import './Session.less'

const Session = props => {
    const [showInfoModal, setShowInfoModal] = useState(false)

    const {subject, date} = props.sessionInfo
    const {name: studentName} = props.sessionInfo.product.student
    const {name: tutorName} = props.sessionInfo.product.tutor
    const {view = "day", upcoming} = props
    return(
        <React.Fragment>

        <SessionInfoModal showModal={showInfoModal} hideModal={() => setShowInfoModal(false)} modalInfo = {props}/>
        <div onClick = {() => setShowInfoModal(true)} className= {`session ${view}-view`}>
            <div className="people-info">
                {tutorName} &lt;&gt;  {studentName}
            </div>
            <div className="time-info hide-small-screens-week">
                {upcoming ? moment(date).format('ddd, MMM Do, h:mmA')  : moment(date).format('LT')}
            </div>
            <div className="subject-info hide-medium-screens">
                {subject}
            </div>
        </div>
        </React.Fragment>

    )
}
export default Session