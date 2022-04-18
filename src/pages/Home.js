import React,{Component} from 'react';
import HomeBlock from '../blocks/HomeBlock';
import MetaTagsInfo from '../blocks/MetaTagsInfo';

var Constants = require("../config/Constants");

class Home extends Component{
	componentDidMount(){
		window.scrollTo(0, 0);
		document.title = Constants.DEFAULT_PAGE_TITLE;
	}
	renderMeta = () => {
		var metas = {
			metatitle: Constants.DEFAULT_PAGE_TITLE,
			metadescription: "DriveItAway"
		}
		return(
			<MetaTagsInfo metas={metas} pageTitle={Constants.DEFAULT_PAGE_TITLE} action="home"/>
		)
	}	
	render(){
		return (
			<div>
				{this.renderMeta()}
				<HomeBlock/>
				
			</div>
		)
	}
}
 export default Home;