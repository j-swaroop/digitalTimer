// Write your code here
// Write your code here
import {Component} from 'react'
import './index.css'

const initiateState = {
    isTimeRunning: false,
    timeElapsedInSeconds: 0,
    timeLimitInMinutes: 25
}


class DigitalTimer extends Component{
    state = initiateState

    componentWillUnmount = () => {
        this.clearTimerInterval()
    }

    clearTimerInterval = () => clearInterval(this.intervalId)

    onIncrementTimeLimit = () => {
        this.setState(prevState => ({timeLimitInMinutes: prevState.timeLimitInMinutes + 1}))
    }

    onDecrementTimeLimit = () => {
        const {timeLimitInMinutes} = this.state
        if (timeLimitInMinutes > 1)
        this.setState(prevState => ({timeLimitInMinutes: prevState.timeLimitInMinutes - 1}))
    }


    renderTimerLimitController = () => {
        const {isTimeRunning, timeElapsedInSeconds, timeLimitInMinutes} = this.state
        const isButtonDisabled = timeElapsedInSeconds > 0
        return(
            <div className="set-timer-limit-container">
                <p className="set-timer-text"> Set Timer Limit</p>
                <div className="set-timer-container">
                    <button disabled={isButtonDisabled} type="button" onClick={this.onDecrementTimeLimit} className="minus-plus-button"> - </button>
                    <p className="timer-text"> {timeLimitInMinutes}</p>
                    <button disabled={isButtonDisabled} type="button" onClick={this.onIncrementTimeLimit} className="minus-plus-button"> + </button>
                </div>
            </div>
        )
    }

    onResetTimer = () => {
        this.clearTimerInterval()
        this.setState(initiateState)
    }

    incrementTimeElapsedInSeconds = () => {
        const {isTimeRunning, timeElapsedInSeconds, timeLimitInMinutes} = this.state
        const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60
        if (isTimerCompleted){
            this.clearTimerInterval()
            this.setState({isTimeRunning: false})
        }else{
            this.setState(prevState => ({
                timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1
            }))
        }
        
    }


    onStartOrPauseTimer = () => {
        const {isTimeRunning, timeElapsedInSeconds, timeLimitInMinutes} = this.state
        const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

        if(isTimerCompleted){
            this.clearTimerInterval()
            this.setState({timeElapsedInSeconds: 0})
        }

        if(isTimeRunning){
            this.clearTimerInterval()
        }else{
            this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
        }
        this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
        

    }

    renderTimerController = () => {
        const {isTimeRunning} = this.state
        const startOrPauseImg = isTimeRunning? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
        : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
        const altText = isTimeRunning? "pause icon": "play icon"

        return(
            <div className="start-reset-container">
                <div className="start-reset-text-container text">
                    <button  type="button" onClick={this.onStartOrPauseTimer}  className="button">
                        {isTimeRunning?
                            <img className="play-icon-img" alt={altText} src={startOrPauseImg}/>
                            : <img className="play-icon-img" alt={altText} src={startOrPauseImg}/>
                        }
                        {isTimeRunning? "Pause": "Start"}
                    </button>
                </div>
                <div className="start-reset-text-container">
                    <button onClick={this.onResetTimer} type="button" className="button">
                        <img className="play-icon-img" alt="reset icon" src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "/>
                        Reset
                    </button>
                    
                </div>
            </div>
        )
    }

   
    getElapsedSecondsInTimeFormat = () => {
        const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
        const totalRemainingSeconds = timeLimitInMinutes * 60 - timeElapsedInSeconds
        const minutes = Math.floor(totalRemainingSeconds / 60)
        const seconds = Math.floor(totalRemainingSeconds % 60)
        const stringifiedMinutes = minutes > 9 ? minutes: `0${minutes}`
        const stringifiedSeconds = seconds > 9 ? seconds: `0${seconds}`

        return `${stringifiedMinutes}:${stringifiedSeconds}`
    }

    render(){
        const {isTimeRunning, timeElapsedInSeconds, timeLimitInMinutes} = this.state 
        const labelText = isTimeRunning? "Running": "Paused"
        
        return(
            <div className="bg-container">
                <div className="body-container">
                    <h1 className="heading"> Digital Timer</h1>
                    <div className="timer-body-container">
                        <div className="timer-bg-container">
                            <div className="timer-container">
                                <h1 className="timer"> {this.getElapsedSecondsInTimeFormat()}</h1>
                                <p className="pause-or-run-text"> {labelText}</p>
                            </div>
                        </div>

                        <div className="timer-text-container">
                            {this.renderTimerController()}
                            {this.renderTimerLimitController()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DigitalTimer








