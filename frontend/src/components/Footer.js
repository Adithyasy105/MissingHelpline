import React from "react";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-4">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} MissingHelp System. All rights reserved.</p>
                <p>Our platform connects families, communities, and authorities to assist in locating missing individuals. Together, we can make a difference.</p>
                <p>
                    <a href="/privacy-policy" className="text-white text-decoration-none mx-2">Privacy Policy</a> | 
                    <a href="/terms-of-service" className="text-white text-decoration-none mx-2">Terms of Service</a> | 
                    <a href="/contact-us" className="text-white text-decoration-none mx-2">Contact Us</a>
                </p>
                <p>Follow us on:
                    <a href="https://www.facebook.com" className="text-white text-decoration-none mx-2">Facebook</a> | 
                    <a href="https://www.twitter.com" className="text-white text-decoration-none mx-2">Twitter</a> | 
                    <a href="https://www.instagram.com" className="text-white text-decoration-none mx-2">Instagram</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
