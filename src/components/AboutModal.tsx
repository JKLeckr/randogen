import { IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonModal } from '@ionic/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { version } from '../version';

import './css/AboutModal.css';

const aboutText = `
RandoGen v${version} - A simple random generator app.

Copyright (C) 2024  JKLeckr
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
`

const AboutModal = ({ dismiss }: { dismiss: (data?: string | null | undefined | number, role?: string) => void }) => {
  const { t, i18n } = useTranslation();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("About")}</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => dismiss(null, 'close')}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        {aboutText}
      </IonContent>
    </IonPage>
  );
};
export default AboutModal;
