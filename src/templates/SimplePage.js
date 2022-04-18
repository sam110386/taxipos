import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Login from '../pages/Login';
import Home from '../pages/Home';

class SimplePage extends Component {
    getPage = () => {
        switch (this.props.page) {
            case 'login': return (<Login />);
            default: return (
                <>
                    <Header />
                    <Home />
                    <Footer />
                </>);
        }
    }

    render() {
        return (
            <div>
                {this.getPage()}
            </div>

        );
    }
}

export default SimplePage;