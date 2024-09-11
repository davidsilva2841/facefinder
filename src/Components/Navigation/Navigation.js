import React from "react";
import Button from '../Button'

const Navigation = ({onRouteChange, isSignedIn}) => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            {isSignedIn ? (
                // <p
                //     onClick={() => onRouteChange('signout')}
                //     className='f3 link underline dim pa3 pointer'
                // >
                //     Sign out
                // </p>
                //
                <Button
                    text='Sign out'
                    onClick={() => onRouteChange('signout')}
                    className='f3 link underline dim pa3 pointer'
                />

            ) : (
                // <p
                //     onClick={() => onRouteChange('signin')}
                //     className='f3 link underline dim pa3 pointer'
                // >
                // Sign In
                // </p>
                <Button
                    text='Sign In'
                    onClick={() => onRouteChange('signin')}
                    className='f3 link underline dim pa3 pointer'
                />
            )}
        </nav>
    );
};

export default Navigation;
