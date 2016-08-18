import React from 'react';
import {
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import s from './entryStyles';

const Entry = ({ entry, getQueue }) => (
  <TouchableHighlight onPress={() => getQueue(entry)}>
    <View style={s.box}>
      <Image source={{ uri: entry.imageUrl, height: 180 }} />
      <Text ellipsizeMode numberOfLines={1} style={s.title}>{entry.title}</Text>
      <Text ellipsizeMode numberOfLines={1} style={s.description}>{entry.description}</Text>
    </View>
  </TouchableHighlight>
);

export default Entry;