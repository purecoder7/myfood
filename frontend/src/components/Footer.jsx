import React from 'react';

function Footer() {
  return (
    <>
      <footer className="bg-light text-center text-lg-start shadow-sm mt-4">
        <div className="container p-4">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">
              © 2025 <a href="https://flowbite.com/" className="text-decoration-none">GoFood</a>. All Rights Reserved.
            </span>
            <ul className="list-unstyled d-flex mb-0">
              <li className="me-3">
                <a href="#" className="text-muted text-decoration-none">About</a>
              </li>
              <li className="me-3">
                <a href="#" className="text-muted text-decoration-none">Privacy Policy</a>
              </li>
              <li className="me-3">
                <a href="#" className="text-muted text-decoration-none">Licensing</a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
