import api, { params } from '../services/api';

export const getBoardByName = async name => {
  try {
    const boards = await api.get('/1/members/me/boards', {
      params: { ...params, lists: 'open', fields: 'id,name,url,lists' },
    });
    const nameMatch = new RegExp(name, 'i');

    for (const board of boards.data) {
      if (board?.name.match(nameMatch)) {
        return board;
      }
    }
  } catch (err) {
    console.log(err);
  }
  return;
};
