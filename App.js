import React, {useState, useEffect, Component} from 'react';
import { v4 as uuid } from 'uuid';
import './index.css';
import Header from './components/Header'
import Appointments from "./components/Appointments";
import NewAppointment from "./components/NewAppointment"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 1,
            appointmentList: {}
        }
    }

    componentDidMount() {
    }

    setView = (view) => {
        this.setState({view});
    }

    deleteAppointment = (item) => {
        const cloneAppointment = {...this.state.appointmentList};
        cloneAppointment[item.date] = cloneAppointment[item.date].filter(app => app.time !== item.time);
        if (cloneAppointment[item.date].length === 0) {
            delete cloneAppointment[item.date];
        }
        this.setState({appointmentList: cloneAppointment});
    }

    addAppointment = (newAppointment) => {
        const cloneAppointment = {...this.state.appointmentList};
        if (this.state.appointmentList[newAppointment.date]) {
            cloneAppointment[newAppointment.date] = [...cloneAppointment[newAppointment.date], newAppointment];
        } else {
            cloneAppointment[newAppointment.date] = [newAppointment];
        }
        this.setState({appointmentList: cloneAppointment, view: 2});

    }

    renderMainView = () => {
        const {view, appointmentList} = this.state;
        switch (view) {
            case 1:
                return <div className='d-flex justify-content-between' >
                            <div className='firstImage'>
                                <img src="../public/hair.jpg" className="pt-1 w-100" alt="hair" />
                            </div>
                            <div className='secondImage'>
                                <img src="../public/main.jpg" className="pt-1 w-100" alt="main" />
                            </div>
                        </div>
            case 2:
                return  <Appointments setView={this.setView} appointmentList={appointmentList} deleteAppointment={this.deleteAppointment}/>
            case 3:
               return <NewAppointment appointmentList={appointmentList} addAppointment={this.addAppointment}/>
            default:
                return <img src="../public/hair.jpg" className="pt-1 w-100" alt="hair" />

        }
    }

    render = () => {
        const {view} = this.state;

        return (
            <div className="container">
                <Header view={view}
                        setView={this.setView} />
                {this.renderMainView()}
            </div>
        )
    };
}
export default App;

