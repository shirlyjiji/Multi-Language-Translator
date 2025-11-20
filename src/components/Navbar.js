import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{
                background: 'linear-gradient(135deg, #000000ff, #000000ff)',
            }}
        >
            <div className="container p-3">
                {/* --- Logo --- */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="/lang.png"
                        alt="AI Translation Studio Logo"
                        style={{
                            height: '55px',
                            width: '150px',
                            objectFit: "cover",
                            marginRight: '10px',
                            borderRadius: '6px',
                        }}
                    />
                    {/* Optional: remove below text if you want logo only */}
                    {/* <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        AI Translation Studio
                    </span> */}
                </Link>

                {/* --- Mobile Menu Toggle --- */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* --- Menu Links --- */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav  ">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/translator">Translator</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>

                    </ul>
                </div>
                <Link
                    className="btn ms-2"
                    id="tryit"
                    to="/translator"
                    style={{ backgroundColor: "#ffffff", color: "black", fontWeight: "bold" }}
                >
                    Try It Now
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
