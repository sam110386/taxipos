import React,{Component} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';

var Constants = require("../config/Constants");
//axios.defaults.headers.common['Authorization'] =  Constants.API_AUTH_TOKEN;

class MetaTagsInfo extends Component{

	state ={
		id: (this.props.id) ? this.props.id : 0,
		title: (this.props.metas && this.props.metas.metatitle) ? this.props.metas.metatitle : "",
		description: (this.props.metas && this.props.metas.metadescription) ? this.props.metas.metadescription : "",
		keyword: (this.props.metas && this.props.metas.metakeyword) ? this.props.metas.metakeyword : "",
		url: window.location.href
	}
	componentDidMount(){
		if(this.props.action){
			this.getMetas()
			return;
		}
		this.setState({
			title: this.props.metas.metatitle || "",
			description: this.props.metas.metadescription || "",
			keyword: this.props.metas.metakeyword || "",
		})
	}
	componentWillReceiveProps(nextProps,nextState){
		if(nextProps.action){
			this.getMetas()
			return;
		}
		this.setState({
			title: nextProps.metas.metatitle || "",
			description: nextProps.metas.metadescription || "",
			keyword: nextProps.metas.metakeyword || "",
		})
	}
	getMetas = async() => {
		return;
		var self = this;
		axios.post(Constants.API_ENDPOINT+"getMetas", {
		    page: self.props.action,
		    id: self.state.id
		})
	  	.then(function (response) {
	  		if(response.data.status){
	  			self.setState({
	  				title: response.data.result.metatitle,
	  				description: response.data.result.metadescription,
	  				keyword: response.data.result.metakeyword,
	  			});
	  		}
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});		
	}
	render(){
		return(
			<MetaTags>
            	<title>{(this.state.title) ? this.state.title : this.props.pageTitle +  " | " + Constants.SITE_TITLE}</title>
            	<meta property="og:title" content={this.state.title} />
            	<meta name="description" content={this.state.description} />
            	<meta name="keywords" content={this.state.keyword} />
            	<link rel="canonical"  href={this.state.url} />
          	</MetaTags>
		)
	}
}

export default MetaTagsInfo;
