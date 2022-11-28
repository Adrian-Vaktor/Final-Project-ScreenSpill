
import styled from 'styled-components'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

// react-calendar
// https://www.npmjs.com/package/react-calendar


const Calendar_Page = () => {

    const [value, onChange] = useState(new Date());

    return (
        <>
            Calendar_Page
            <Calendar onChange={onChange} value={value} />
        </>
    )
}


export default Calendar_Page;