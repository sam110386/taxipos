import React,{Component} from 'react';

class FakeNotification extends Component{
  componentDidMount(){        
		var notifyTime = 5000;
    var messages = [
      {title: '<h5>Madeleine Morrison</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Piers  Reid</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Julia  Dickens</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Deirdre Sharp</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Melanie Walsh</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Michelle Newman</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Harry Forsyth</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>200 Orders</h5>', text: '<p>booked<br><small>in the last 24 hours</small></p>'},
      {title: '<h5>Jane Hardacre</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Lillian Pullman</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>180 Orders</h5>', text: '<p>booked<br><small>in the last 20 hours</small></p>'},
      {title: '<h5>Jason Mathis</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Blake Harris</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Melanie Rees</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>150 Orders</h5>', text: '<p>booked<br><small>in the last 15 hours</small></p>'},
      {title: '<h5>Carol Alsop</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Nathan Sharp</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Liam Poole</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Felicity Butler</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Richard Scott</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Connor Jones</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Branon Hughes</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Nicholas McGrath</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Alan Welch</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Jason Nash</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Leonard Ince</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Emma Baker</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Carolyn Walker</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Stephanie Paterson</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Karen Burgess</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Leonard Langdon</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Caroline Springer</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Tim Russell</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Joe Gill</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Stephanie King</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Liam Gibson</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Sarah Underwood</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Thomas Wilkins</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Stephen Sharp</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Joshua Hughes</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Donna Walsh</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'},
      {title: '<h5>Max Paterson</h5>', text: '<p>Just booked an order<br><small>a few seconds ago</small></p>'},
      {title: '<h5>Adam Cameron</h5>', text: '<p>Just booked an order<br><small>a minute ago</small></p>'}
    ];
    function transition(){
      clearTimeout(timer);
      var i = Math.floor(Math.random() * 44);
      if(i < 44){        	
    	var message = messages[i];
	    info({
	      title: message.title,
	      titleTrusted: true,
	      text: message.text,
	      textTrusted: true,
	      sticker: false,
	      hide: true,
	      icon: false,
	      delay: 2000,
	      width: '300px',
	      closer: true,
	      animation: 'fade',
	      animateSpeed: 'slow',
	      shadow: true,
	      remove: true,
	      mode: 'dark',
	      destroy: true
	    });
      }
      timer = setTimeout(transition, notifyTime);
    }
      var timer = setTimeout(transition, notifyTime);	    
  }
  render(){
	 return(<div></div>);
  }
}

export default FakeNotification;