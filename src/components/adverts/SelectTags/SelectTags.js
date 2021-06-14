import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { tagsLoadedAction } from '../../../store/actions';
import { getTags } from '../../../store/selectors';
import { CheckboxGroup } from '../../shared';

function SelectTags(props) {
  const dispatch = useDispatch();
	const tags = useSelector(getTags);

  React.useEffect(() => {
		dispatch(tagsLoadedAction());
	}, []);

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
