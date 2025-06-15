import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

const ScannerPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const loadingMessages = [
    "we're running this on a Raspberry Pi in someone's basement", 
    "our infrastructure budget is approximately $3.50",
    "running on hopes, dreams, and a single DigitalOcean droplet",
    "our server is literally a toaster with WiFi",
    "our datacenter is just a laptop under someone's desk",
    "hosted on a refurbished calculator from the 90s",
    "powered by the collective sighs of our unpaid developers"
  ];
  
  const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <Layout>
      <Head>
        <title>Scanner - TON Security</title>
        <meta name="description" content="TON Smart Contract Scanner" />
      </Head>
      <div style={{
        padding: 0,
        margin: 0,
        height: 'calc(100vh - 60px)', // Account for navbar height
        width: '100%',
        position: 'relative'
      }}>
          {isLoading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--ifm-background-color)',
              zIndex: 10
            }}>
              <div style={{
                textAlign: 'center',
                color: 'var(--ifm-color-emphasis-700)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid var(--ifm-color-emphasis-300)',
                  borderTop: '4px solid var(--ifm-color-primary)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px auto'
                }} />
                <div style={{ fontSize: '1.2rem' }}>
                  Loading scanner...
                </div>
                <div style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                  Keep patience: {randomMessage}
                </div>
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            </div>
          )}
          <iframe
            src="https://scan.nowarp.io"
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title="TON Contract Scanner"
            allow="clipboard-read; clipboard-write"
            onLoad={() => setIsLoading(false)}
          />
      </div>
    </Layout>
  );
};

export default ScannerPage; 
