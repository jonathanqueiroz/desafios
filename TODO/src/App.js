import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import MyButton from './MyButton'

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
class App extends Component {
	state = {
		todo_text: '',
		todos : [],
		teste: []
	}

	add = () => { 
		if(this.state.todo_text != ''){
			console.log(this.state.todo_text)
			axios.post(`http://localhost:888/todos`, {todo_text: this.state.todo_text})
			.then(res => {
				this.loadItems()
			})  
		}
	}
	removeItem = (item) => {
		axios.delete(`http://localhost:888/todos/`+item)
		.then(res => {
			this.loadItems()
		})  
	}
	loadItems = () => {
		axios.get(`http://localhost:888/todos`)
		.then(res => {
			this.setState({
				todo_text: '',
				todos: res.data	
			})
		})  
	}
	handleChange = (e) => { this.setState({todo_text: e.target.value}) }
	componentDidMount(){ 
		this.loadItems()
	}
	render(){
		const items = []
		for (const [index, value] of this.state.todos.entries()) {
			items.push(<li key={index}>{value} - <a onClick={(e) => { this.removeItem(index)}} key={index} href="#">Apagar Tarefa</a></li>)
		}
		return <>
			<h1>TODOS</h1>
			<ul>
			{items}
			</ul>
			<input type="text" id="todo_text" value={this.state.todo_text} placeholder="digite o todo" onChange={e => {this.handleChange(e)}}/>
			{/* <button onClick={this.add}>Adicionar</button> */}
			<MyButton value="Adicionar" onClick={this.add} />
		</>
	}
}
export default App
