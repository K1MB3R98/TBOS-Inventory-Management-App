import React from 'react';
import tbosLogo from './assets/tbos-logo.png';

function Header() {
    return (
        <section className='header'>
            <div className='logoTitle'>
                <div className='logo'>
                    <img src={tbosLogo} />
                </div>
                <div className="titles">
                    <h1>Two Birds One Stone Foods</h1>
                    <h2>- Inventory Management -</h2>
                </div>
            </div>
        </section>
    )
}
export default Header;