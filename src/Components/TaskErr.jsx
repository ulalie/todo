import React from 'react'
import './App/App.css'

class ErrorMessage extends React.Component{
    render(){
        const { message } = this.props
        return <div className='err'>{message}</div> 
    }
}
export default ErrorMessage