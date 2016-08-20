import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import { actions as playlistActions } from '../../modules/playlist';
import Entry from './Entry';
import s from './styles';

class AddToPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      toggleCreate: false,
    };
  }

  renderInput() {
    return (
      <Animatable.View animation="fadeInLeft" style={s.inputBox}>
        <TextInput
          style={s.input}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder="Create New Playlist"
          placeholderTextColor="purple"
        />
        <Icon
          style={s.buttons}
          name="md-add-circle"
          size={30}
          onPress={() => {
            this.setState({ toggleCreate: false });
            this.props.actions.createPlaylist({
              title: this.state.text,
              podcasts: [this.props.playlist.podcast._id],
            });
          }}
        />
        <Icon
          style={s.buttons}
          name="ios-remove-circle"
          size={30}
          onPress={() => this.setState({ toggleCreate: false })}
        />
      </Animatable.View>
    );
  }

  renderPlusButton() {
    return (
      <Animatable.View animation="bounceIn" style={s.create}>
        <Icon
          style={s.addButton}
          name="md-add"
          size={30}
          color="#fff"
          onPress={() => this.setState({ toggleCreate: true })}
        />
      </Animatable.View>
    );
  }

  render() {
    const { actions, playlist } = this.props;
    return (
      <View style={s.container}>
        <ScrollView style={s.innerContainer}>
          {playlist.list.map(entry =>
            <Entry
              key={entry._id}
              entry={entry}
              podcast={playlist.podcast}
              updatePlaylist={actions.updatePlaylist}
            />
          )}
        </ScrollView>
        <View style={s.header}>
          <Text style={s.headerTitle}>ADD TO PLAYLIST</Text>
        </View>
        <View style={s.createContainer}>
          {this.state.toggleCreate ? this.renderInput() : this.renderPlusButton()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  playlist: state.playlist,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(playlistActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylist);
