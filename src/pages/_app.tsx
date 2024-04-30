import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';

import FooterWrapper from '@/footers';
import LayoutWrapper from '@/layouts';
import { wrapper } from '@/store/wrapper';

const App = ({ Component, ...rest }: AppProps) => {
  const { props, store } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <LayoutWrapper>
        <FooterWrapper>
          <Component {...{ ...pageProps }} />
        </FooterWrapper>
      </LayoutWrapper>
    </Provider>
  );
};

export default appWithTranslation(App);
