import React from 'react'
import './App/App.css'
import ErrorMessage from './TaskErr.jsx'

class Header extends React.Component {
	render() {
		return (
			<div className='header'>
				<h1>TO DO LIST</h1>
				<div className='header'></div>
				<div className='add-input'>
					<span>Задача*:</span>
					<input
						type='text'
						placeholder='Сделать дз по веб-проге'
						value={this.props.taskName}
						onChange={this.props.onTaskNameAdd}
						onKeyDown={this.props.onKeyDown}
					/>
					<span>Описание:</span>
					<input
						type='text'
						placeholder='Изучить доки'
						value={this.props.taskDescription}
						onChange={this.props.onTaskDescriptionAdd}
					/>
					<span>Уровень важности:</span>
					<select
						className='severity'
						value={this.props.severity}
						onChange={this.props.onTaskSeverity}
					>
						<option value='urgent'>Срочно</option>
						<option value='medium'>Средне</option>
						<option value='notUrgent'>Не срочно</option>
					</select>
				</div>
				<button className='add' onClick={this.props.onTaskAdd}>
					Добавить
				</button>
				<ErrorMessage message={this.props.error}></ErrorMessage>
			</div>
		)
	}
}

export default Header
