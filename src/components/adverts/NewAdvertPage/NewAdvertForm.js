import T from 'prop-types';

import useForm from '../../../hooks/useForm';
import { InputFile } from '../../shared';
import SelectTags from '../SelectTags';

const validName = ({ name }) => name;
const validPrice = ({ price }) =>
  !Number.isNaN(price) && Number.isFinite(price) && price >= 0;
const validTags = ({ tags }) => !!tags.length;

function NewAdvertForm({ onSubmit }) {
  const { formValue: advert, handleChange, handleSubmit, validate } = useForm({
    name: '',
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  });
  const { name, sale, price, tags } = advert;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" value={name} onChange={handleChange} />
      <input
        type="checkbox"
        name="sale"
        checked={sale}
        onChange={handleChange}
      />
      <input type="number" name="price" value={price} onChange={handleChange} />
      <SelectTags multiple name="tags" value={tags} onChange={handleChange} />
      <InputFile name="photo" onChange={handleChange} />
      <button disabled={!validate(validName, validPrice, validTags)}>
        Save
      </button>
    </form>
  );
}

NewAdvertForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default NewAdvertForm;
