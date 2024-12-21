import React from 'react'
import Header from '../Header'
import ToDo from '../Todo'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import TaskInfo from '../TaskInfo'
import TaskFilter from '../TaskFilter'
import SearchInput from '../SearchInput'
import { generateTodos } from '../../utils/generate-todos'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			taskName: '',
			taskDescription: '',
			todos: [],
			filters: {
				onlyUnchecked: false,
				severity: '',
				searchTerm: '',
			},
			message: '',
			severity: 'notUrgent',
		}
	}

	handleKeyDown = e => {
		if (e.key === 'Enter') {
			this.handleSetTask()
		}
	}

	handleSetTaskName = e => {
		this.setState({ taskName: e.target.value })
	}

	handleSetTaskDescription = e => {
		this.setState({ taskDescription: e.target.value })
	}

	handleSetTask = () => {
		const { taskName, taskDescription } = this.state
		const trimmedTaskName = taskName.trim()
		const trimmedTaskDescription = taskDescription.trim()

		if (!trimmedTaskName) {
			this.setState({ message: 'Поле задачи обязательно для заполнения!' })
			return
		}

		if (this.state.todos.some(todo => todo.name === trimmedTaskName)) {
			this.setState({ message: 'Такая задача уже существует(' })
			return
		}

		const newTodo = {
			id: uuidv4(),
			name: trimmedTaskName,
			description: trimmedTaskDescription,
			isChecked: false,
			timeAdded: new Date().toLocaleString(),
			severity: this.state.severity,
		}

		this.setState(prevState => ({
			todos: [...prevState.todos, newTodo],
			taskName: '',
			taskDescription: '',
			message: '',
			severity: 'notUrgent',
		}))
	}

	handleTodoChecked = id => {
		this.setState(prevState => {
			const updatedTodos = prevState.todos.map(todo => {
				if (todo.id === id) {
					return { ...todo, isChecked: !todo.isChecked }
				}
				return todo
			})
			return { todos: updatedTodos }
		})
	}

	handleTaskDelete = id => {
		this.setState(prevState => ({
			todos: prevState.todos.filter(todo => todo.id !== id),
		}))
	}

	handleFilterChange = (filterName, value) => {
		this.setState(prevState => ({
			filters: {
				...prevState.filters,
				[filterName]: value,
			},
		}))
	}

	generateRandomTodos = (n = 1000) => {
		const newTodos = generateTodos()
		this.setState(prevState => ({
			todos: [...prevState.todos, ...newTodos],
		}))
	}

	getFilteredTodos() {
		const { todos, filters } = this.state
		const { onlyUnchecked, severity, searchTerm } = filters

		const filterFunctions = [
			todo => (onlyUnchecked ? !todo.isChecked : true),
			todo => (severity ? todo.severity === severity : true),
			todo => {
				const searchLower = searchTerm.toLowerCase()
				return (
					todo.name.toLowerCase().includes(searchLower) ||
					todo.description.toLowerCase().includes(searchLower)
				)
			},
		]

		return todos.filter(todo => filterFunctions.every(filter => filter(todo)))
	}

	getSortedTodos(todos) {
		return [...todos].sort((a, b) => a.isChecked - b.isChecked)
	}

	render() {
		const filteredTodos = this.getFilteredTodos()
		const sortedTodos = this.getSortedTodos(filteredTodos)

		const numCheckedTodo = sortedTodos.filter(todo => todo.isChecked).length
		const numTotalTodos = this.state.todos.length
		const numUncheckedTodos = sortedTodos.filter(todo => !todo.isChecked).length

		return (
			<div className='main'>
				<Header
					taskName={this.state.taskName}
					taskDescription={this.state.taskDescription}
					error={this.state.message}
					onTaskNameAdd={this.handleSetTaskName}
					onTaskDescriptionAdd={this.handleSetTaskDescription}
					onTaskAdd={this.handleSetTask}
					onKeyDown={this.handleKeyDown}
					severity={this.state.severity}
					onTaskSeverity={this.handleSetSeverity}
				/>
				<TaskInfo
					numCheckedTodo={numCheckedTodo}
					numTotalTodos={numTotalTodos}
					numUncheckedTodos={numUncheckedTodos}
				/>
				<SearchInput
					searchTerm={this.state.filters.searchTerm}
					onSearchInput={e =>
						this.handleFilterChange('searchTerm', e.target.value)
					}
				/>
				<TaskFilter
					onlyUnchecked={this.state.filters.onlyUnchecked}
					onOnlyUnchecked={() =>
						this.handleFilterChange(
							'onlyUnchecked',
							!this.state.filters.onlyUnchecked
						)
					}
					onSetFilterSeverity={value =>
						this.handleFilterChange('severity', value)
					}
				/>
				<button
					className='generate'
					onClick={() => this.generateRandomTodos(1000)}
				>
					Сгенерировать 1000 задач
				</button>
				{sortedTodos.length > 0 ? (
					<ToDo
						todos={sortedTodos}
						onTodoChecked={this.handleTodoChecked}
						onTaskDelete={this.handleTaskDelete}
					/>
				) : (
					<p className='message'>Ничего не найдено. Добавьте todos!</p>
				)}
			</div>
		)
	}
}

export default App
