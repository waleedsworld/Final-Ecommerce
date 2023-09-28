// In your App.js or App.jsx
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { Layout } from '../components';
import { StateContext } from '../context/StateContext';
import config from '../lib/config';
const design = config.design.map(item => item.label);
const color1 = design[0]
const color2 = design[1]
const color3 = design[2]

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Access the root element to set CSS variables
    const root = document.documentElement;

    // Update CSS variables with imported values
    root.style.setProperty('--primaryColor', color1);
    root.style.setProperty('--primaryColor1', color2);
    root.style.setProperty('--primaryColor2', color3);
  }, []);

  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
