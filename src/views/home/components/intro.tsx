'use client';
import { useTranslation } from 'next-i18next';
import React from 'react';

export default function Intro() {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl md:text-5xl text-[#00B9FF] font-extralight">
        {t('intro.p1')}
      </h1>
      <h1 className="text-xl sm:text-2xl md:text-5xl font-semibold">
        {t('intro.p2')}
      </h1>
      <div className="flex flex-col items-center text-xs sm:text-sm md:text-xl pt-4 md:pt-10 space-y-2">
        <p>{t('intro.p3')}</p>
        <p>{t('intro.p4')}</p>
      </div>
    </div>
  );
}
