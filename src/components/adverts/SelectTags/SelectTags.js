import React from 'react';

import { getTags } from '../../../api/adverts';
import { CheckboxGroup } from '../../shared';

function SelectTags(props) {
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    getTags().then(setTags);
  }, []);

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
