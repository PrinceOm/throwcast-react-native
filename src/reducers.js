import { combineReducers } from 'redux';
import { reducers as auth } from './modules/auth';
import { reducers as authForm } from './components/auth-form';
import { reducers as baseModal } from './containers/baseModal';
import { reducers as player } from './modules/player';
import { reducers as playerRemote } from './containers/playerRemote';
import { reducers as playlist } from './modules/playlist';
import { reducers as podcast } from './modules/podcast';
import { reducers as queue } from './containers/queue';
import routes from './routes';
import { reducers as station } from './modules/station';

export default combineReducers({
  auth,
  authForm,
  baseModal,
  player,
  playerRemote,
  playlist,
  podcast,
  queue,
  routes,
  station,
});
