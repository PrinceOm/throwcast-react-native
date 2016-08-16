import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';

import { actions as playerActions } from '../player';
import { formattedTime } from './utils';
import s from './styles';


class PlayerRemote extends Component {
  slideChange(value) {
    this.props.actions.setCurrentTime(Math.round(value * this.props.playerRemote.duration));
  }

  slideComplete() {
    this.props.playerRemote.audio.seek(this.props.playerRemote.currentTime);
    this.props.actions.togglePlay();
  }

  render() {
    const { player, playerRemote, actions } = this.props;
    const { togglePlay, nextPodcast, previousPodcast } = actions;
    const index = player.currentIndex;
    const podcast = player.podcastList[index];
    const prevButton = {
      onPress: index > 0 ? previousPodcast : null,
      style: s.rewind,
      name: 'ios-rewind',
      size: 30,
      color: index > 0 ? '#fff' : '#333',
    };

    const toggleButton = {
      onPress: togglePlay,
      style: s.play,
      name: player.playing ? 'ios-pause' : 'ios-play',
      size: 50,
      color: '#fff',
    };

    const hasNext = index < player.podcastList.length - 1;
    const nextButton = {
      onPress: hasNext ? nextPodcast : null,
      style: s.forward,
      name: 'ios-fastforward',
      size: 30,
      color: hasNext ? '#fff' : '#333',
    };

    return (
      <View style={s.container}>
        <View style={s.backButton}>
          <Icon onPress={Actions.pop} name="ios-arrow-back" size={30} color="#FFF" />
        </View>
        <Image style={s.image} source={{ uri: podcast.imageUrl }} />
        <Text style={s.title}>
          {podcast.title}
        </Text>
        <Text style={s.description}>
          {podcast.description}
        </Text>
        <View style={s.sliderContainer}>
          <Slider
            onSlidingStart={actions.slide}
            onValueChange={(value) => this.slideChange(value)}
            onSlidingComplete={() => this.slideComplete()}
            minimumTrackTintColor="#851c44"
            style={s.slider}
            trackStyle={s.sliderTrack}
            thumbStyle={s.sliderThumb}
            value={playerRemote.currentTime / playerRemote.duration}
          />
          <View style={s.timeInfo}>
            <Text style={s.timeLeft}>
              {formattedTime(playerRemote.currentTime)}
            </Text>
            <Text style={s.timeRight}>
              {formattedTime(playerRemote.duration)}
            </Text>
          </View>
        </View>
        <View style={s.controlContainer}>
          <Icon {...prevButton} />
          <Icon {...toggleButton} />
          <Icon {...nextButton} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  playerRemote: state.playerRemote,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(playerActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerRemote);
