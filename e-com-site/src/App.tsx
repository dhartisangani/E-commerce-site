import React, { useEffect } from 'react'
import Router from './Routes/Router'
import { useTranslation } from 'react-i18next';

const App = () => {
  const { i18n } = useTranslation();

  const localLang: any = localStorage.getItem("lang");
  useEffect(() => {
    if (localLang !== "" && localLang !== null) {
      i18n.changeLanguage(i18n.language.toString());
    } else {
      i18n.changeLanguage("ja");
    }
  }, []);
  return (
    <>
      <Router/>
    </>
  )
}

export default App