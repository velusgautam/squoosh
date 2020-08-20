/**
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { h } from 'preact';
import styles from 'css-bundle:./all.css';
import clientBundleURL, { imports } from 'client-bundle:client/index.tsx';
const BasePage = ({ children, title }) => {
  return h(
    'html',
    { lang: 'en' },
    h(
      'head',
      null,
      h('title', null, title ? `${title} - ` : '', 'Squoosh'),
      h('meta', {
        name: 'viewport',
        content: 'width=device-width, minimum-scale=1.0',
      }),
      h('link', { rel: 'stylesheet', href: styles }),
      h('script', { src: clientBundleURL, defer: true }),
      imports.map((v) => h('link', { rel: 'preload', as: 'script', href: v })),
    ),
    h('body', null, children),
  );
};
export default BasePage;
