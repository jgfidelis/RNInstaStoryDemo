/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';

import Stories from './src/Stories';

const stories = [
  {
    id: '0',
    image: require('./resources/image1.jpg'),
  },
  {
    id: '1',
    image: require('./resources/image2.jpg'),
  },
  {
    id: '2',
    image: require('./resources/image3.jpg'),
  },
];

type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return (
      <Stories stories={stories} />
    );
  }
}
