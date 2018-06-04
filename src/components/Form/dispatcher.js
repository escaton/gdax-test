import reducer from './reducer';
const dispatch = action => state => reducer(state, action);

export default dispatch;
