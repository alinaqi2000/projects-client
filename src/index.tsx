import React from 'react'
import ReactDOM from 'react-dom'

import 'react-toastify/dist/ReactToastify.css';
import "./styles/main.scss"
import Header from './components/Layout/Header'
import UsersList from './components/Users/UsersList';
import ProjectsList from './components/Projects/ProjectsList';
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <div className="App">
            <ToastContainer />
            <Header />
            <div className="cont">
                <UsersList />
                <div className="row w-100">
                    <div className="col-md-6">
                        <ProjectsList />
                    </div>
                    <div className="col-md-6">
                        {/* <ProjectsList /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))