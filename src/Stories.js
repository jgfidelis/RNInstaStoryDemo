// @flow

import * as React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

import Story from './Story';

const { width } = Dimensions.get('window');
const perspective = 350;
const A = Math.atan(perspective / width / 2);

type Props = {
  stories: Array<{ id: string, image: any }>,
};

type State = {
  x: Animated.Value,
};

export default class Stories extends React.PureComponent<Props, State> {
  state = {
    x: new Animated.Value(0),
  };

  getStyle = (index: number) => {
    const { x } = this.state;
    const offset = width * index;
    const inputRange = [offset - width, offset + width];
    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / 2, -width / 2],
      extrapolate: 'clamp',
    });
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [`${A}rad`, `-${A}rad`],
      extrapolate: 'clamp',
    });
    const translateX1 = x.interpolate({
      inputRange,
      outputRange: [width / 2, -width / 2],
      extrapolate: 'clamp',
    });
    return {
      ...StyleSheet.absoluteFillObject,
      transform: [{ perspective }, { translateX }, { rotateY }, { translateX: translateX1 }],
    };
  };

  render() {
    const { stories } = this.props;
    const { x } = this.state;
    return (
      <View style={styles.container}>
        {stories.map((story, index) => (
          <Animated.View style={this.getStyle(index)} key={story.id}>
            <Story story={story} />
          </Animated.View>
        ))}
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ width: width * stories.length }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={width}
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          horizontal={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
