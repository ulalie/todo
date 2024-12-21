import React from 'react'
import './App/App.css'
import TodoItem from './OneTodo.jsx'

class ToDo extends React.PureComponent {
	render() {
		const { todos } = this.props
		return (
			<div>
				{todos.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onTodoChecked={this.props.onTodoChecked}
						onTaskDelete={this.props.onTaskDelete}
					></TodoItem>
				))}
			</div>
		)
	}
}

export default ToDo
