import React from 'react'
import './App/App.css'

class SearchInput extends React.Component {
	render() {
		return (
			<input className='search'
				type='text'
				placeholder='Поиск'
				value={this.props.searchTerm}
				onChange={this.props.onSearchInput}
			></input>
		)
	}
}

export default SearchInput
