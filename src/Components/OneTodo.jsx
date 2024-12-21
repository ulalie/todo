import React from 'react'
import './App/App.css'

class TodoItem extends React.PureComponent {
	render() {
		const severityMap = {
			urgent: 'Срочно',
			medium: 'Средне',
			notUrgent: 'Не срочно',
		}
		const { todo, onTodoChecked, onTaskDelete } = this.props
		return (
			<div className='todo-all'>
				<input
					className='checkbox'
					type='checkbox'
					checked={todo.isChecked}
					onChange={() => onTodoChecked(todo.id)}
				/>
				<div
					className='todo'
					style={{
						background: todo.isChecked
							? 'linear-gradient(to right, #AAA, #FFCC99)'
							: 'linear-gradient(to right, #ffae79, #ffe179)',
					}}
				>
					<h1
						style={{
							textDecoration: todo.isChecked ? 'line-through' : 'none',
						}}
					>
						{todo.name}
					</h1>
					<h3
						style={{
							textDecoration: todo.isChecked ? 'line-through' : 'none',
						}}
					>
						{todo.description}
					</h3>
					<p className='severity-info'>{severityMap[todo.severity]}</p>
					<small>Создано: {todo.timeAdded}</small>
					<button className='delete' onClick={() => onTaskDelete(todo.id)}>
						<img src='../src/img/delete.svg' alt='Удалить' />
					</button>
				</div>
			</div>
		)
	}
}

export default TodoItem
