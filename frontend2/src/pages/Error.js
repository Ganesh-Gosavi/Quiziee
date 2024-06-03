import React from 'react'; // Import React library
import style from './error.module.css'; // Import CSS module for styling

// Functional component to display error message
export default function Error() {
    return (
        <div className={style.container}>
            {/* Heading for the error */}
            <h1>Error</h1>
            {/* Message indicating page not found */}
            <p>Page Not Found</p>
            {/* Placeholder for error image (alt text provided) */}
            <img src="errorImage" alt='errorImage' />
        </div>
    );
}
