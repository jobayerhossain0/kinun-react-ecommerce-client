import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './contexts/AuthProvider';
import ScrollToTop from 'react-scroll-to-top';
import store from './app/store';
import { Provider } from 'react-redux';
import ApiUrlProvider from './contexts/ApiUrlProvider';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-multi-carousel/lib/styles.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#F0F0F0" highlightColor="#fff">
      <PhotoProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ApiUrlProvider>
              <AuthProvider>
                <Toaster
                  position="bottom-center"
                  toastOptions={{
                    // Define default options
                    className: '',
                    duration: 3000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                    // Default options for specific types
                    success: {
                      duration: 3000,
                      theme: {
                        primary: 'green',
                        secondary: 'black',
                      },
                    },
                    error: {
                      duration: 3000,
                      theme: {
                        primary: 'red',
                        secondary: 'black',
                      },
                    },
                  }}
                />
                <App />
                <ScrollToTop
                  className="flex items-center justify-center border"
                  smooth
                />
              </AuthProvider>
            </ApiUrlProvider>
          </QueryClientProvider>
        </Provider>
      </PhotoProvider>
    </SkeletonTheme>
  </React.StrictMode>
);
