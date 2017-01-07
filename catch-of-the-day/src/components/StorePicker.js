//Need to do this in every js file.  There is no global import
import React from 'react';
//Named Import
import { getFunName} from '../helpers';

class StorePicker extends React.Component{


	//below binds the method to the class
	//constructor()
	//{
	//	super();
	//	this.goToStore = this.goToStore.bind(this);
	//}

	goToStore(event){
		event.preventDefault();
		//first grab the text
		console.log('You changed the URL');

		const storeId = this.storeInput.value;

		//second we are going to route to store:storeId
		this.context.router.transitionTo('/store/' + storeId);
	}


	//Need a render method in every class
	render(){
		return (
			//Can only return one parent element
			<form className="store-selector" onSubmit={this.goToStore.bind(this)}>
				{ /* Example Comment */}
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue= {getFunName()}
				ref={(input) => { this.storeInput = input}}/>
				<button type="submit">Visit Store -></button>
			</form>

		)
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}
export default StorePicker;