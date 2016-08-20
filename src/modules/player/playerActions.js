import { Actions } from 'react-native-router-flux';

export function select(queueId, podcasts, currentIndex) {
  return {
    type: 'SELECT_PODCAST',
    queueId,
    podcasts,
    currentIndex,
  };
}

export function setAudio(audio) {
  return {
    type: 'SET_AUDIO_REF',
    audio,
  };
}

export function selectPodcast(queueId, podcasts, index, changePodcast) {
  return (dispatch) => {
    if (changePodcast) {
      dispatch(select(queueId, podcasts, index));
    }

    Actions.playerRemote();
  };
}

export function togglePlay() {
  return {
    type: 'TOGGLE_PLAY',
  };
}

export function setDuration(duration) {
  return {
    type: 'SET_DURATION',
    duration,
  };
}

export function clearAnimation() {
  return {
    type: 'CLEAR_ANIMATION',
  };
}

export function next(animation) {
  return {
    type: 'NEXT_PODCAST',
    animation,
  };
}

export function previous(animation) {
  return {
    type: 'PREVIOUS_PODCAST',
    animation,
  };
}

export function nextPodcast() {
  return (dispatch, getState) => {
    const { player } = getState();
    const animation = player.currentIndex % 2 ? 'slideInRight' : 'bounceInRight';
    dispatch(next(animation));
  };
}

export function previousPodcast() {
  return (dispatch, getState) => {
    const { player } = getState();
    const animation = player.currentIndex % 2 ? 'slideInLeft' : 'bounceInLeft';
    dispatch(previous(animation));
  };
}

export function setCurrentTime(currentTime) {
  return {
    type: 'SET_CURRENT_TIME',
    currentTime,
  };
}

export function slide() {
  return {
    type: 'SLIDE',
  };
}

export function onLoad({ duration }) {
  return (dispatch) => {
    dispatch(setDuration(duration));
  };
}

export function onProgress({ currentTime }) {
  return (dispatch) => {
    dispatch(setCurrentTime(currentTime));
  };
}

export function onEnd(index, length) {
  return (dispatch) => {
    if (index < length - 1) {
      dispatch(nextPodcast());
    } else {
      dispatch(togglePlay());
    }
  };
}
