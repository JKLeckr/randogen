import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import { diceSharp, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';
import { getSeed, getRandomSeed, getRangeMin, getRangeMax, setSettings, saveSettings as saveSetSettings } from '../settings';
import { nextIntRange as randNextRange, setSeed as randSetSeed, reset as randReset } from '../random';
import { useState, useCallback, useEffect, useRef } from 'react';
import './css/Home.css';

const copyToClipboard = async (text: string, toast: string = "") => {
  await Clipboard.write({
    string: text
  });
  if (toast.length > 0) {
    await Toast.show({
      text: "Copied to clipboard."
    });
  }
}
const saveSettings = (seed: string, randomSeed: boolean, rangeMin: number, rangeMax: number) => {
  setSettings({
    seed,
    randomSeed,
    rangeMin,
    rangeMax,
  });
  randSetSeed(seed);
  saveSetSettings();
}

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const randoMin = useRef(getRangeMin());
  const randoMax = useRef(getRangeMax());
  const [randoSeed, setRandoSeed] = useState(getSeed());
  const randoRandomSeed = useRef(getRandomSeed());
  const [randoStr, setRandoStr] = useState(localStorage.getItem("randostr") || "0");
  const [randoStrSize, setRandoStrSize] = useState(6.0);
  const [randoStrWeight, setRandoStrWeight] = useState(700);
  useEffect(() => {
    localStorage.setItem("randostr", randoStr);
  }, [randoStr]);
  /*useEffect(() => {
  }, [randoSeed]);*/
  const randoTextTapEvent = useCallback(
    () => {
      copyToClipboard(randoStr, t("CopiedToClipboard"));
    }, [randoStr]
  );
  const rollEvent = useCallback(
    () => {
      setRandoStr(String(randNextRange(randoMin.current, randoMax.current)));
    }, [randoMin, randoMax]
  );
  const resetEvent = () => {
    setRandoStr("0");
    randReset();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot='start'>RandoGen</IonTitle>
          <IonButtons slot='end'>
            <IonButton id='menu-button'>
              <IonIcon slot='icon-only' md={ellipsisVertical} ios={ellipsisHorizontal} aria-label={t("Menu")}/>
            </IonButton>
          </IonButtons>
          <IonPopover trigger='menu-button' dismissOnSelect={true}>
            <IonContent>
              <IonList>
                <IonItem button={true} detail={false} onClick={resetEvent}>{t("Reset")}</IonItem>
              </IonList>
              <IonList>
                <IonItem button={true} detail={false}>{t("Seed")}</IonItem>
              </IonList>
              <IonList>
                <IonItem button={true} detail={false}>{t("Range")}</IonItem>
              </IonList>
              <IonList>
                <IonItem button={true} detail={false}>{t("About")}</IonItem>
              </IonList>
            </IonContent>
          </IonPopover>
        </IonToolbar>
      </IonHeader>
      <div className='main-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div id='numbers' style={{fontSize:`${randoStrSize}em`, fontWeight: randoStrWeight}}><span className='rando-text' onClick={randoTextTapEvent}>{randoStr}</span></div>
        <IonButton fill='outline' size='large' shape='round' style={{position: 'absolute', bottom: '32px'}} onClick={rollEvent}>
          <IonIcon slot='icon-only' icon={diceSharp} aria-label={t("Roll")}/>
        </IonButton>
      </div>
    </IonPage>
  );
};

export default Home;
