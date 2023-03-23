import AddChannel from './AddChannel';

const modals = {
  adding: AddChannel,
};

export default (modalName) => modals[modalName];
