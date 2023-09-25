import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import './StaticPages.scss';

export default function Support() {
  return (
    <Layout>
      <div className="container">
        <div className="center-content">
          <h1>This is a simulated page</h1>
          <p>
            This is a project framed within the final project of the Degree in Multimedia, this is a
            content simulation for the static pages.
          </p>
          <p>If you want to know more about the project, you can contact:</p>

          <div className="link-footer">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/pablopsdigital/gomyecotrip-client"
            >
              Project Repository
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
