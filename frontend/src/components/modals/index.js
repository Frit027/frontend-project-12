import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const modals = {
    adding: AddChannel,
    removing: RemoveChannel,
    renaming: RenameChannel,
};

export default (modalName) => modals[modalName];
