import React, {useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


import './styles.css';

export default function Schedule(){

    const[value, onChange] = useState(new Date());

    return(
        <div className="col-12 col-lg-6">
            <Calendar onChange={onChange}
            value={value}
            />


        </div>
        
    )
}