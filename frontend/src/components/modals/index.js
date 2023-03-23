import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
};

export default (modalName) => modals[modalName];
