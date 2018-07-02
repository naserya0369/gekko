import { get } from '../../../tools/ajax'
import store from '../../'
import { bus } from '../../../components/global/ws'
import _ from 'lodash'

const init = () => {
  get('gekkos', (err, resp) => {
    const gekkos = resp;
    store.commit('syncGekkos', gekkos);
  });
}

const sync = () => {
  bus.$on('gekko_new', data => store.commit('addGekko', data.state));
  bus.$on('gekko_event', data => store.commit('updateGekko', data));
  bus.$on('gekko_archived', data => store.commit('archiveGekko', data.id));
  bus.$on('gekko_error', data => store.commit('errorGekko', data));

  // unused:
  // bus.$on('gekko_stopped', data => store.commit('stopGekko', data.id));
}

export default function() {
  init();
  sync();
}