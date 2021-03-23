import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { toggleCheck } from './dataInboxSlice';

const TableRow = ({ record, isChecked }) => {
  const { register, errors, setError } = useForm({ 
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  // Using controlled inputs, for when data is removed we need to reset the input values
  const [fields, setFields] = useState({
    fundName: '',
    dueDate: '',
    price: '',
  })

  useEffect(() => {
    // update fields when we get an updated state, or else the DOM shows old values if not controlled.
    setFields({
      fundName: record.data.fund_name.text,
      dueDate: record.data.due_date.text,
      price: record.data.price.text
    })
    if (record.data.due_date.validation_error) {
      setError('dueDate', 'invalid date format');
    }
  }, [record, setError]);

  return (
    <div className='table-row'>
      <div className='table-cell'>
        <input 
          data-testid="remove-checkbox"
          name='checkbox'
          type='checkbox'
          checked={isChecked}
          onChange={() => dispatch(toggleCheck(record.uuid))}
          className='table-checkbox'
        />
      </div>
      <div className='table-cell table-record-name'>
        {record.name}
      </div>
      <div className='table-cell'>
        {format(new Date(record.created), 'LLLL d, uu')}
      </div>
      <div className='table-cell'>
        <input 
          name='fundName'
          className='table-input'
          onChange={(e) => setFields({ ...fields, fundName: e.target.value })}
          value={fields.fundName}
          ref={register({ required: true })}
        />
      </div>
      <div className='table-cell'>
        <input
          data-testid='dueDate'
          name='dueDate' 
          className={`${errors.dueDate && 'input-error'} table-input`}
          onChange={(e) => setFields({ ...fields, dueDate: e.target.value })}
          value={fields.dueDate}
          ref={
            register({
              required: true,
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
              }
            })
          }
        />
      </div>
      <div className='table-cell'>
        <input
          name='price'
          className='table-input'
          value={fields.price} onChange={(e) => setFields({ ...fields, price: e.target.value })}
          ref={register({ required: true })}
        />
      </div>
    </div>
  )
}

export default TableRow