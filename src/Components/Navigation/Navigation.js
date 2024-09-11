import React from "react";

const Navigation = ({ onRouteChange, isSignedIn}) => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            {isSignedIn ? (
                <p
                    onClick={() => onRouteChange('signout')}
                    className='f3 link underline dim pa3 pointer'
                >
                    Sign out
                </p>
            ) : (
                <>
                    <p
                        onClick={() => onRouteChange('signin')}
                        className='f3 link underline dim pa3 pointer'
                    >
                    Sign In
                    </p>
                    <p
                        onClick={() => onRouteChange('register')}
                        className='f3 link underline dim pa3 pointer'
                        >
                            Register
                        </p>
                </>
            )}
            </nav>
            );
};

export default Navigation;
