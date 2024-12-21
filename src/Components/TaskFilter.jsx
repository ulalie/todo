import React from 'react'
import './App/App.css'

class TaskFilter extends React.Component {
	render() {
		const { onlyUnchecked, onOnlyUnchecked } = this.props
		return (
			<div className='task-filter'>
				<div className='filter'>
					<input
						type='checkbox'
						checked={onlyUnchecked}
						onChange={onOnlyUnchecked}
						className='checkbox'
					/>
					<label>Только невыполненные</label>
				</div>
				<select  className='select' onChange={e => this.props.onSetFilterSeverity(e.target.value)}>
					<option value=''>Все</option>
					<option value='urgent'>Срочно</option>
					<option value='medium'>Средне</option>
					<option value='notUrgent'>Не срочно</option>
				</select>
			</div>
		)
	}
}

export default TaskFilter
