import { v4 as uuidv4 } from 'uuid'

const severities = ['urgent', 'medium', 'notUrgent']

export const generateTodos = (n = 1000) => {
	const todos = []
	for (let i = 0; i < n; i++) {
		todos.push(generateTodo())
	}
	return todos
}

const generateTodo = () => ({
	id: uuidv4(),
	name: getRandomString(),
	description: getRandomString(),
	isChecked: Math.random() > 0.5,
	timeAdded: getRandomDate().toLocaleString(),
	severity: getRandomSeverity(),
})

const getRandomString = () => {
	return Math.random().toString(36).substring(2)
}

const getRandomSeverity = () => {
	const randomIndex = Math.floor(Math.random() * severities.length)
	return severities[randomIndex]
}

const getRandomDate = () => {
	const start = new Date(2022, 0, 1) // 
	const end = new Date() 

	const randomDate = new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	)
	return randomDate
}