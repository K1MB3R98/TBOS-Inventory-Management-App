import React from 'react';

function Footer() {
    return (
        <section className="footer">
            {/* Return to Top of Page Button */ }
            < div className = "returnToTop" >
                <a href="./index.html#header"><i className="fas fa-arrow-circle-up"></i></a>
            </div >
            <p>Created at <a className="juno" href="https://junocollege.com/">Juno College</a> by <a className="creator" href="www.linkedin.com/in/kimberley-schubert">Kimberley Schubert</a></p>
            < div className="returnToTop">
                <a href="./index.html#header"><i className="fas fa-arrow-circle-up"></i></a>
            </div >
        </section>
    )
}

export default Footer;