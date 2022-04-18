import React,{Component} from 'react';
class Loader extends Component{
	
	render(){
		return (
			<div className="se-pre-con align-items-center justify-content-center" id="loader">
				<div className="loader_img"><div className="spinner-border text-primary" role="status">
				<span className="sr-only">Loading...</span></div></div>
			</div>
		)
	}
}
export default Loader;