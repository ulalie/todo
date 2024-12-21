import React from 'react'
import './App/App.css'

class TaskInfo extends React.Component {
	render() {
		const { numCheckedTodo, numTotalTodos, numUncheckedTodos, onlyUnchecked } = this.props
		return (
			<div className='info'>
				<p>Всего задач: {numTotalTodos}</p>
				{!onlyUnchecked && <p>Выполнено задач: {numCheckedTodo}</p>}
				<p>Невыполнено задач: {numUncheckedTodos}</p>
			</div>
		)
	}
}

export default TaskInfo
