import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../utils/base.js'

class App extends React.Component {
	constructor(){
		super();
		
		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);

		this.loadSamples = this.loadSamples.bind(this);

		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);

		//This is the initial state
		this.state = {
			fishes: {},
			order: {}

		};
	}

	//Lifecycle Method
	componentWillMount()
	{

		//This runs right before the app is rendered
		const storeUrl = this.props.params.storeId + '/fishes';
		//console.log(storeUrl);
		this.ref = base.syncState(storeUrl,
		{
			context: this,
			state: 'fishes'
		});

		const storeKey = 'order=' + this.props.params.storeId;
		//check local storage
		const localStorageRef = localStorage.getItem(storeKey)
		

		if(localStorageRef){
			//update the order state
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}

	}

	//Lifecycle Method
	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	//Lifecycle method
	//This updates right before props and state load
	componentWillUpdate(nextProps, nextState){
		const storeKey = 'order=' + this.props.params.storeId;
		const orderVal = JSON.stringify(nextState.order);
		localStorage.setItem(storeKey, orderVal);
	}

	loadSamples()
	{
		this.setState({
			fishes: sampleFishes
		})
	}

	addFish(fish){
		//update our state
		//...is a spread that will take every item from object - its from ES6
		const fishes = {...this.state.fishes};
		//add in new fish
		const timestamp = Date.now();
		fishes['fishes-' + timestamp] = fish;
		//set state
		//instead of react watching the object - we have to tell it to update state
		//The fishes state changed with fishes
		this.setState({fishes: fishes})
	}

	removeFish(key)
	{
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({ fishes });
	}

	updateFish(key, updatedFish){
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({ fishes });
	}


	addToOrder(key){
		//Copy the state
		//Object spread
		const order = {...this.state.order};
		//update or add the number of fish ordered
		order[key] = order[key] + 1 || 1;
		//update the state
		this.setState({ order });
	}

	removeFromOrder(key){
		const order = {...this.state.order};
		//could use delete order
		delete order[key];
		this.setState({ order });
	}

	render() {
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className='list-of-fishes'>
						{
							Object
								.keys(this.state.fishes)
								.map(key=> <Fish key={key} index={key}
									details={this.state.fishes[key]} 
									addToOrder={this.addToOrder}/>)
						}
					</ul>
				</div>
				<Order 	fishes={this.state.fishes} 
						order={this.state.order} 
						params={this.props.params}
						removeFromOrder={this.removeFromOrder}

				/>
				<Inventory 	addFish={this.addFish} 
							loadSamples={this.loadSamples}
							fishes = {this.state.fishes} 
							updateFish={this.updateFish}
							removeFish={this.removeFish}
							storeId={this.props.params.storeId}
							
				/>
			</div>
		)
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;