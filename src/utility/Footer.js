import React from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa';
import { isAuthenticated } from '../auth/helper/index.js';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-7 col-md-7">
            <h6>Quick Links</h6>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <ul className="footer-links">
                  <li className="quick-links">
                    <Link style={{ textDecoration: 'none' }} to="/">
                      Home
                    </Link>
                  </li>
                  <li className="active quick-links">
                    <Link to="/aboutUs">About us</Link>
                  </li>
                  <li className="active quick-links">
                    <Link to="/skinquiz">Skin Quiz</Link>
                  </li>

                  {isAuthenticated() ? (
                    <li className="active quick-links">
                      <Link to="/orders">My Account</Link>
                    </li>
                  ) : (
                    <li className="active quick-links">
                      <Link to="/faq">FAQs</Link>
                    </li>
                  )}
                </ul>
              </div>
              <div className="col-sm-12 col-md-4">
                <ul className="footer-links">
                  <li className="active quick-links">
                    <Link to="/contactUs">Contact Us</Link>
                  </li>
                  <li className="quick-links">
                    <Link to="/reviews">Reviews</Link>
                  </li>
                  <li className="active quick-links">
                    <Link to="/blogs">Blogs</Link>
                  </li>
                  {isAuthenticated() ? (
                    <li className="active quick-links">
                      <Link to="/faq">FAQs</Link>
                    </li>
                  ) : (
                    ''
                  )}
                </ul>
              </div>
              <div className="col-sm-12 col-md-4">
                <ul className="footer-links">
                  <li className="active quick-links">
                    <Link to="/refund-policy" target="_blank">
                      Refunds
                    </Link>
                  </li>
                  <li className="active quick-links">
                    <Link to="/privacy-policy" target="_blank">
                      Privacy
                    </Link>
                  </li>
                  <li className="active quick-links">
                    <Link to="/terms" target="_blank">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <h6>Contacts</h6>
            <ul className="footer-links">
              <li>
                <a target="_blank" href="mailto:support@circleskincare.com">
                  Email : support@circleskincare.com
                </a>
              </li>
              <li>
                <a target="_blank" href="tel:+917648044505">
                  Phone : +91 7648044505
                </a>
              </li>
              <li>
                <a target="_blank" href="https://wa.me/message/AOT6C4KESOBCJ1">
                  Whatsapp : +91 7648044505
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6">
            <p className="copyright-text">
              Copyright &copy; 2020 All Rights Reserved by
              <a target="_blank" href="#">
                {' '}
                Circle Skincare Pvt. Ltd.
              </a>
              .
            </p>
          </div>

          <div className="col-md-4 col-sm-6">
            <ul className="social-icons">
              <li>
                <a
                  target="_blank"
                  className="whatsapp"
                  href="https://wa.me/message/AOT6C4KESOBCJ1"
                >
                  <FaWhatsapp />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  className="facebook"
                  href="http://Facebook.com/circleskincare.official"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  className="twitter"
                  href="https://twitter.com/CircleSkincare"
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  className="instagram"
                  href="http://Instagram.com/circleskincare.official"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  className="linkedin"
                  href=" https://www.linkedin.com/company/circle-skincare"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
