import React, { Fragment } from 'react'
import spinner from './spinner.gif'

export const Spinner = () => 
        <Fragment>
            <img src={spinner} alt="Loading..." style={{ width: '200px', margin: 'auto', display: 'block'}}/>
        </Fragment>


/**
 * 1. If we have no other code apart from our return statement in the functional component, we can remove the return statement and simply mention the jsx in arrow function
 * 2. We can add inline styles to the component using 'style' attribute and pass the style as an object inside {}
 *  Like: {{ width: '200px', margin: 'auto', display: 'block'}}
 * OR we can declare it as a constant and call it
 */

 export default Spinner;