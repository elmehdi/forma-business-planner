import test from 'node:test';
import assert from 'node:assert/strict';
import { t, setLanguage, getLanguage, locale } from '../dist/i18n.js';
import { CANVAS_BLOCKS, SECTIONS, SCENARIOS, newPlan } from '../dist/model.js';
import { webcrypto } from 'node:crypto';
globalThis.crypto=webcrypto;
test('French covers every canvas prompt, written section, and scenario',()=>{
  setLanguage('fr');
  for(const [,name,prompt,placeholder] of CANVAS_BLOCKS)for(const text of [name,prompt,placeholder])assert.notEqual(t(text),text,text);
  for(const [,name,subtitle,prompt] of SECTIONS)for(const text of [name,subtitle,prompt])assert.notEqual(t(text),text,text);
  for(const s of SCENARIOS){assert.notEqual(t(s.name),s.name);assert.notEqual(t(s.description),s.description);}
});
test('dynamic counters, forecasts, errors, and confirmations translate',()=>{
  setLanguage('fr');
  assert.equal(t('2 of 9 blocks started'),'2 cases commencées sur 9');
  assert.equal(t('1 words'),'1 mot');
  assert.equal(t('Monthly fixed costs'),'Charges fixes mensuelles');
  assert.equal(t('Your realistic forecast'),'Vos prévisions réalistes');
  assert.equal(t('Cash runs out in month 4'),'Trésorerie épuisée au mois 4');
  assert.equal(t('1 plan imported.'),'1 plan importé.');
  assert.equal(t('This file is not a valid Forma business plan.'),'Ce fichier n’est pas un plan d’affaires Forma valide.');
});
test('English selection is reversible and unknown user text is preserved',()=>{
  setLanguage('en');assert.equal(getLanguage(),'en');assert.equal(t('Save version'),'Save version');assert.equal(locale(),'en-GB');
  setLanguage('fr');assert.equal(locale(),'fr-MA');assert.equal(t('My own business description'),'My own business description');assert.equal(t('Save version'),'Enregistrer une version');
});
test('new plans use MAD without changing financial assumptions',()=>{
  const p=newPlan({title:'Mon projet',owner:'Mehdi'});assert.equal(p.currency,'MAD');assert.equal(p.scenarios.realistic.assumptions.monthlyRevenue,0);
});
