
import I18n,{ getLanguages } from 'react-native-i18n'
import DeviceInfo from 'react-native-device-info'
import DataRepository from '~/locales/tools/DataRepository'
import en from '~/locales/en-US.js'
import zh from '~/locales/zh-CN.js'
import th from '~/locales/th-TH.js'

I18n.defaultLocale = 'en';

I18n.fallbacks = true;

I18n.translations = {
    en,
    zh,
    th
};

I18n.localeLanguage = () => {
    new DataRepository().fetchLocalRepository('localLanguage')
        .then((res)=>{
            I18n.locale = res;
        })
        .catch((error)=>{
            I18n.locale = DeviceInfo.getDeviceLocale();
        });
    return I18n.locale;
};


export { I18n, getLanguages };
